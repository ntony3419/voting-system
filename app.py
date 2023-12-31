
import pyotp

from flask import Flask, render_template, request, redirect, url_for, jsonify
# TODO: import library for mongodb connection
from src.db import Database
from werkzeug.security import generate_password_hash, check_password_hash
from src.user import *
from src.auth import *
from datetime import datetime, timedelta


app = Flask(__name__)
## session
app.secret_key = 'thisisrandomvaluetest'

key = "NeuralNineSuperSecretKey"


#mongodb connection

db= Database()


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


@app.route('/verify-totp', methods=['POST'])
def verify_totp():
    data = request.get_json()
    user_code = data.get('code', '')
    totp = pyotp.TOTP(key)
    is_valid = totp.verify(user_code)
    if is_valid:
        # Code is valid, redirect to the dashboard or another page
        return jsonify({'isValid': is_valid})
    else:
        # Code is incorrect, show a prompt or send a message
        return jsonify({'message': 'Incorrect TOTP code. Please try again.'})
    


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
def handle_login():    
    from src.auth import login_required
    data = request.get_json() #user data from form in front end
    username = data.get('username')
    password = data.get('password')
    user_class = User(username,password)
    return user_class.login()

@app.route('/logout')
def handle_logout():
    # TODO: end all session al return to signin page
    app=current_app
    session.clear()
    flash('you have been log out for inactivity')
    return User.logout()
    

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()  
    username = data['username']
    password = data['password']
    email = data['email']
    phone = data['phone']
    user_id = db.add_user(username, password, email, phone)
    # TODO: get data from encrypted function in login.js and process it to database
    if user_id:
        # registered 
        return jsonify({'message': 'user registered', 'id': str(user_id)})
    else:
        # failed
        return jsonify({'message': 'registration failed'}), 400


@app.route('/forgot-password')
def forgot_password():
    # TODO : logic for reset password
    # for now, we'll just redirect to the home page.
    return redirect(url_for('home'))

@app.route('/dashboard')
@login_required
def dashboard():
    user_id = session.get('user_id')
    user_data = db.find_by_id(user_id)  
    if user_data:
        user = User(user_data['username'], user_data['password'], user_data['roles'])
        return render_template('dashboard.html', roles=user.roles)
    else:
        flash('User not found.')
        return redirect(url_for('logout'))

@app.route('/vote', methods=['GET', 'POST'])
@login_required
@role_required('user', 'voter')
def vote():
    #fetch candidates from MongoDB
    candidates = fetch_candidates()
    candidates = [
        {
            'id': '1',
            'image_url': 'path_to_image_1.jpg',
            'name': 'John Doe',
            'age': '30',
            'position': 'President'
        },
        {
            'id': '2',
            'image_url': 'path_to_image_2.jpg',
            'name': 'Jane Smith',
            'age': '28',
            'position': 'Vice President'
        },
        {
            'id': '3',
            'image_url': 'path_to_image_3.jpg',
            'name': 'Emily Johnson',
            'age': '35',
            'position': 'Secretary'
        }
    ]
    # if request.method == 'POST':
    #     # TODO logic to vote a candidate and save it to mongodb
    #     pass
    # else: # display vote table where show all candidates
        
    return render_template('vote.html', candidates=candidates)
   

@app.route('/add-candidate', methods=['GET', 'POST'])
@login_required
@role_required('user', 'admin')
def add_candidate():
    if request.method == 'POST':
        # TODO logic to add a candidate to MongoDB
        pass
    else:
        return render_template('add_candidate.html')

@app.before_request
def before_request():
    session.permanent = True  #
    app.permanent_session_lifetime = timedelta(minutes=1)

    last_activity = session.get('last_activity')
    if last_activity is not None:
        last_activity = datetime.strptime(last_activity, '%Y-%m-%dT%H:%M:%S.%f')
        if datetime.now() - last_activity > app.permanent_session_lifetime:
            session.clear()
            flash('You have been logged out due to inactivity.')
            return redirect(url_for('home'))

    session['last_activity'] = datetime.now().isoformat()

def fetch_candidates():
    #TODO: logic to retrieve all candidate from mongodb
    pass
def verify_cred(username, password):
    # TODO: method to validate the username and password 
    return True

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)