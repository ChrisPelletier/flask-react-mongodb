from flask import jsonify, request, g
from functools import wraps
from config import SECRET_KEY
from server import db
import urllib
import json
import datetime
import jwt

users_collection = db.users

def handle_error(error, status_code):
    """Handles the errors
    """
    resp = jsonify(error)
    resp.status_code = status_code
    return resp

def encode_auth_token(user_id):
    """
    Generates the JWT
    :return: string
    """
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1, seconds=0),
            'iat': datetime.datetime.utcnow(),
            'sub': user_id
        }
        return jwt.encode(
            payload,
            SECRET_KEY,
            algorithm='HS256'
        ).decode("ascii")
    except Exception as e:
        return e

def authenticate(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth = request.headers.get("Authorization", None)
        if not auth:
            return handle_error({"code": "authorization_header_missing",
                                "description": "Authorization header is expected"}, 401)

        parts = auth.split()

        if parts[0].lower() != "bearer":
            return handle_error({"code": "invalid_header",
                                "description": "Authorization header must start with Bearer"}, 401)
        elif len(parts) == 1:
            return handle_error({"code": "invalid_header",
                                "description": "Token not found"}, 401)
        elif len(parts) > 2:
            return handle_error({"code": "invalid_header", "description": "Authorization header must be Bearer token"}, 401)

        token = parts[1]

        try:
            payload = jwt.decode(token, SECRET_KEY)
            current_user_id = payload['sub']
            user = users_collection.find_one({"_id":current_user_id})
            return f(user, *args, **kwargs)
        except jwt.ExpiredSignatureError:
            return handle_error({"code": "expired_session",
                                "description":"Signature expired. Please log in again."}, 401)
        except jwt.InvalidTokenError:
            return handle_error({"code": "invalid_token",
                                "description":"Invalid token. Please log in again."}, 401)
        except Exception:
            return handle_error({"code": "invalid_header",
                                    "description": "Unable to parse authentication"
                                                "token."}, 400)
    return wrapper

def validate_json(f):
    @wraps(f)
    def wrapper(*args, **kw):
        try:
            request.get_json()
        except:
            return handle_error({"code": "invalid_json",
                 "description":"Payload must be a valid json"}, 400)
        return f(*args, **kw)
    return wrapper                       