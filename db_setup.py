from config import MONGO_DB_URI, MONGO_DB_NAME
from pymongo import MongoClient

client = MongoClient(MONGO_DB_URI)
db = client[MONGO_DB_NAME]

confirmation = input('Are you sure you want to wipe the database and start over?(type the db name "%s" to confirm) \n' % (MONGO_DB_NAME))

if confirmation == MONGO_DB_NAME:
    counters = db.counters
    counters.delete_many({})
    counters.insert_one({
        '_id': 'userid',
        'seq': 0
    })

    users = db.users
    users.delete_many({})
    print("Database reinitialized.")
else:
    print("Did not reinitialize database.")