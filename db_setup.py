from config import MONGO_DB_URI, MONGO_DB_NAME
from pymongo import MongoClient, errors, ASCENDING
import sys

DB_URI = MONGO_DB_URI
DB_NAME = MONGO_DB_NAME

if len(sys.argv) > 1 and sys.argv[1]:
    DB_URI = sys.argv[1]
if len(sys.argv) > 2 and sys.argv[2]:
    DB_NAME = sys.argv[2]

try:
    client = MongoClient(DB_URI)
    client.drop_database(DB_NAME)
    db = client[DB_NAME]

    confirmation = input('Are you sure you want to wipe the database and start over?(type the db name "%s" to confirm) \n' % (MONGO_DB_NAME))

    if confirmation == MONGO_DB_NAME:
        counters = db.counters
        counters.insert_one({
            '_id': 'userid',
            'seq': 0
        })

        users = db.users
        print("Database reinitialized.")
    else:
        print("Did not reinitialize database.")
except errors.ConnectionFailure:
    print("Failed to connect to server {}".format(DB_URI))
except errors.ConfigurationError:
    print("A password is required.")