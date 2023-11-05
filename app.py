from flask import Flask, render_template, request, redirect, url_for
# TODO: import library for mongodb connection
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    # TODO : verify login information and redirect to dashboard if all is correect
    return redirect(url_for('home'))

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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)