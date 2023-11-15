from functools import wraps
from flask import session, redirect, url_for, current_app,flash
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
        if last_activity is not None:
            last_activity_datetime = datetime.strptime(last_activity, '%Y-%m-%dT%H:%M:%S.%f')
            if datetime.now() - last_activity_datetime > app.permanent_session_lifetime:
                session.clear()
                flash('Session timed out')
                return redirect(url_for('login'))
        
        # Update last activity time
        session['last_activity'] = datetime.now().isoformat()
        return f(*args, **kwargs)
    return decorated_function