from flask import jsonify, request, redirect, url_for, session
from datetime import  timedelta
import datetime
from werkzeug.security import check_password_hash
from .db import Database
from app import app
from auth import login_required
class User():
    def __init__(self, username, password, roles=None):
        self.db = Database()
        self.username=username
        self.password= password
        self.roles = roles if roles else []
        self.session = None

    def login(self):
        
        if not self.username or not self.password:
            return jsonify({'error': 'Username and password are required'}), 400
        user = self.db.verify_user(self.username, self.password)
        if user:
            #session create
            app.permanent_session_lifetime = timedelta(minutes=1)
            session['user_id'] = str(user['_id'])  # or any unique identifier
            session['last_activity'] = datetime.now().isoformat()
            session.permanent = True  
            return jsonify({'redirect': url_for('dashboard')})
        else:
            # User is not authenticated
            return jsonify({'error': 'Invalid credentials'}), 401

    def logout(self):
        # Logic to end the user's session and clear session
        session.clear()
        return redirect(url_for('home'))
    
    @login_required
    def assign_role(self, role):
        # Logic to assign a role to the user
        pass

    def has_permission(self, permission):
        # Logic to check if the user has a certain permission
        pass