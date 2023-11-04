from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    # Here you would add logic to verify the username and password.
    # For now, we'll just redirect to the home page.
    return redirect(url_for('home'))

@app.route('/forgot-password')
def forgot_password():
    # Here you would add logic for a password reset.
    # For now, we'll just redirect to the home page.
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)