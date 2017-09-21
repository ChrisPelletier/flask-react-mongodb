from config import MONGO_DB_URI, MONGO_DB_NAME
from pymongo import MongoClient

client = MongoClient(MONGO_DB_URI)
db = client[MONGO_DB_NAME]

counters = db.counters
counters.delete_many({})
counters.insert_one({
    '_id': 'userid',
    'seq': 0
})

users = db.users
users.delete_many({})