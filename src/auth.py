from functools import wraps
from flask import session, redirect, url_for, current_app
from datetime import datetime

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Check if 'user_id' is in session
        if 'user_id' not in session:
            # User is not logged in, redirect to login page
            return redirect(url_for('login'))

        # Check for session timeout due to inactivity
        last_activity = datetime.fromisoformat(session.get('last_activity'))
        if (datetime.now() - last_activity) > current_app.permanent_session_lifetime:
            # Session has timed out
            return redirect(url_for('home'))
        
        # Update last activity time
        session['last_activity'] = datetime.now().isoformat()
        return f(*args, **kwargs)
    return decorated_function