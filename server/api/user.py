from flask import request, jsonify
from . import api_bp
from server import db
from datetime import datetime
from ..utils.password import encrypt_password, verify_password
from ..utils.authenticate import encode_auth_token, validate_json

users_collection = db.users
counter_collection = db.counters

def get_next_sequence(name):
    ret = counter_collection.find_one_and_update(
        { '_id': name },
        {'$inc': { 'seq': 1 }},
        return_document=True)
    return ret['seq']

@api_bp.route('/user', methods=['GET','POST'])
@validate_json
def user():
    if request.method == 'POST':
        payload = request.get_json()
        existing_user = users_collection.find_one({"email":payload['email']})
        if existing_user:
            resp = jsonify({"code":"email_already_exists","description": "A user with that email already exists"})
            resp.status_code = 400
            return resp
        else:
            new_user_id = users_collection.insert({
                '_id': get_next_sequence('userid'),
                'email': payload['email'],
                'password_hash': encrypt_password(payload['password']),
                'created_at': datetime.utcnow(),
                'updated_at': datetime.utcnow()
            })
            new_user = users_collection.find_one({'_id': new_user_id })
            resp = jsonify({"_id": new_user['_id'], 'email': new_user['email']})
            resp.status_code = 201
            return resp

@api_bp.route('/user/login', methods=['POST'])
@validate_json
def login():
    if request.method == 'POST':
        payload = request.get_json()
        user_object = users_collection.find_one({"email":payload['email']})
        if user_object and verify_password(user_object['password_hash'], payload['password']):
            users_collection.update_one({'_id':user_object['_id']}, {"$set": {"last_login": datetime.utcnow()}})
            return jsonify({'jwt': encode_auth_token(user_object['_id'])})
        else:
            resp = jsonify({"code":"user_not_found","description": "That user email and password do not match our records."})
            resp.status_code = 401
            return resp