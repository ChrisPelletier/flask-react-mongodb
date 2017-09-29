from flask import Flask, render_template
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt
from server.api import api_bp as api_blueprint
from config import API_ENVIRONMENT

app = Flask(__name__, static_folder="./static/dist", template_folder="./static")

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

app.register_blueprint(api_blueprint, url_prefix='/api')

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/dist/<path:path>')
def send_js(path):
    return send_from_directory('dist', path)

@app.errorhandler(404)
def page_not_found(e):
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=API_ENVIRONMENT=='development', port=3001)