from config import MONGO_DB_URI, MONGO_DB_NAME
from pymongo import MongoClient

client = MongoClient(MONGO_DB_URI)
db = client[MONGO_DB_NAME]