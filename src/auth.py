from functools import wraps
from flask import session, redirect, url_for, current_app,flash
from datetime import datetime
from .db import Database
from src.user import User
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return redirect(url_for('handle_login'))
        return f(*args, **kwargs)
    return decorated_function

def role_required(*roles):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            user_id = session.get('user_id')
            if not user_id:
                return redirect(url_for('handle_login'))
            user_data = Database.find_by_id(user_id) 
            user = User.from_dict(user_data)
            if not user or not user.has_permission(*roles):
                flash('You do not have access to this resource.')
                return redirect(url_for('dashboard'))
            return f(*args, **kwargs)
        return decorated_function
    return decorator