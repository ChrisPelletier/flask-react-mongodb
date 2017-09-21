import os

API_ENVIRONMENT = os.getenv('API_ENVIRONMENT', 'development')
MONGO_DB_URI = os.getenv('MONGO_DB_URI','mongodb://localhost:27017/')
MONGO_DB_NAME = os.getenv('MONGO_DB_NAME','react_app')
SECRET_KEY = os.getenv('SECRET_KEY', 'A default secret key. My Precious!') 
