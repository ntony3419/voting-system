from flask import Flask, render_template, request, redirect, url_for, jsonify
# TODO: import library for mongodb connection
from pymongo import MongoClient


app = Flask(__name__)

#mongodb connection
client = MongoClient('mongodb://localhost:27017/')
db=client['voting_system']

# users colelction
users = db.users 

## mongodb operation
# add user function
@app.route('/add-user', methods=['POST'])
def add_user():
    name = request.form['name']
    age = request.form['age']
    position = request.form['position']
    
    user_id = users.insert_one({'name': name, 'age': age, 'position': position}).inserted_id
    return jsonify({'id': str(user_id)})

@app.route('/users', methods=['GET'])
def get_users():
    all_users = list(users.find())
    return jsonify(all_users)

@app.route('/update-users/<user_id>', methods=['POST'])
def update_user(user_id):
    # algorithm for update user
    pass

@app.route('/delete-user/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    result = users.delete_one({'_id': ObjectId(user_id)})
    return jsonify({'deleted': result.deleted_count})



@app.route('/')
def home():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    # TODO : verify login information and redirect to dashboard if all is correect
    if verify_cred(username,password):
        return redirect(url_for('dashboard'))
    else:
        return redirect(url_for('home, error = "invalid credential'))

@app.route('/register', methods=['POST'])
def register():
    username = request.json['username']
    password = request.json['password']
    email = request.json['email']
    phone = request.json['phone']

    # TODO: get data from encrypted function in login.js and process it to database
    return jsonify({'message': 'user registered'})



@app.route('/forgot-password')
def forgot_password():
    # TODO : logic for reset password
    # for now, we'll just redirect to the home page.
    return redirect(url_for('home'))

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/vote')
def vote():
    #fetch candidates from MongoDB
    candidates = fetch_candidates()
    return render_template('vote.html', candidates=candidates)

@app.route('/add-candidate', methods=['GET', 'POST'])
def add_candidate():
    if request.method == 'POST':
        # TODO logic to add a candidate to MongoDB
        pass
    return render_template('add_candidate.html')

@app.route('/logout')
def logout():
    # TODO: end all session al return to signin page
    return redirect(url_for('home'))

def fetch_candidates():
    pass
def verify_cred(username, password):
    # TODO: method to validate the username and password 
    return True

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)