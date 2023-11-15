from flask import Flask, render_template, request, redirect, url_for, jsonify
# TODO: import library for mongodb connection
from src.db import Database

app = Flask(__name__)
#mongodb connection

db= Database()


# users colelction
users = db.users_collection 

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
    data = request.get_json()  
    username = data['username']
    password = data['password']
    email = data['email']
    phone = data['phone']
    user_id = db.add_user(username, password, email, phone)
    # TODO: get data from encrypted function in login.js and process it to database
    # if user_id:
    #     # registered 
    #     return jsonify({'message': 'user registered', 'id': str(user_id)})
    # else:
    #     # failed
    #     return jsonify({'message': 'registration failed'}), 400


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
    if request.method == 'POST':
        # TODO logic to vote a candidate and save it to mongodb
        return render_template('vote.html')
    else: # display vote table where show all candidates
        
        return render_template('vote.html', candidates=candidates)
   

@app.route('/add-candidate', methods=['GET', 'POST'])
def add_candidate():
    if request.method == 'POST':
        # TODO logic to add a candidate to MongoDB
        pass
    else:
        return render_template('add_candidate.html')

@app.route('/logout')
def logout():
    # TODO: end all session al return to signin page
    return redirect(url_for('home'))

def fetch_candidates():
    #TODO: logic to retrieve all candidate from mongodb
    pass
def verify_cred(username, password):
    # TODO: method to validate the username and password 
    return True

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)