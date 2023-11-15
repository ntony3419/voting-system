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
        if isinstance(last_activity, str):
            last_activity_datetime = datetime.strptime(last_activity, '%Y-%m-%dT%H:%M:%S.%f')
        elif isinstance(last_activity, datetime):
            last_activity_datetime = last_activity
        else:
          
            raise TypeError('Unexpected data type for last_activity in session.')

        #heck for session timeout due to inactivity
        if (datetime.now() - last_activity_datetime) > current_app.permanent_session_lifetime:
            #  timed out
            return redirect(url_for('logout'))
        
        #Update last activity time
        session['last_activity'] = datetime.now().isoformat()
        return f(*args, **kwargs)
    return decorated_function