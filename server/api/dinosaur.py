from flask import jsonify, request, g
from ..utils.authenticate import authenticate
from . import api_bp
import json

def get_all_dinos():
    dinos = json.loads(open('dinosaurs.json', 'r').read())
    return [{"id": dino['id'], "name": dino['name']} for dino in dinos]

@api_bp.route('/dinosaurs', methods=['GET'])
@authenticate
def get_dino_list(user):
    print(user)
    dinos = get_all_dinos()
    return jsonify(dinos)

@api_bp.route('/dinosaur/<int:dino_id>', methods=['GET'])
@authenticate
def get_dino(user, dino_id):
    all_dinos = json.loads(open('dinosaurs.json', 'r').read())
    dino = [dino for dino in all_dinos if dino['id'] == dino_id][0]
    return jsonify(dino)