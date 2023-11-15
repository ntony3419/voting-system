from pymongo import MongoClient
from bson.objectid import ObjectId
from werkzeug.securitty import check_password_hash,generate_password_hash

class database():
    def __init__(self):
        self.client = MongoClient('mongodb://localhost:27017/')
        self.db = self.client['voting_system']
        self.users_collection = self.db['users']
    def add_user(self, username, password, email, phone_no):
        # Create a new user with hashed password and the role 'user' and 'voter'
        hashed_password = generate_password_hash(password)
        user_data = {
            'username': username,
            'password': hashed_password,
            'email': email,
            'phone_no': phone_no,
            'roles': ['user', 'voter']
        }
        return self.users_collection.insert_one(user_data).inserted_id

    def add_candidate(self, name, age, position):
        # Create a new candidate with the role 'user' and 'candidate'
        candidate_data = {
            'name': name,
            'age': age,
            'position': position,
            'roles': ['user', 'candidate']
        }
        return self.users_collection.insert_one(candidate_data).inserted_id
    def find_user_by_username(self, username):
        return self.users.find_one({'username': username})
        # to allow user to login
    def verify_user(self, username, password):
        user = self.find_user_by_username(username)
        if user and check_password_hash(user['password'], password):
            return user
        else:
            return None