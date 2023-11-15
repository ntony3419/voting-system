document.addEventListener('DOMContentLoaded', function() {
  // Login button
    $(document).ready(function() {
        $('#login-form').on('submit', function(e) {
            e.preventDefault(); // Prevent the default form submission
            var username = $('#username').val();
            var password = $('#password').val();
            if (username && password) {
                $.ajax({
                    type: 'POST',
                    url: '/login',
                    contentType: 'application/json;charset=UTF-8',
                    data: JSON.stringify({
                        'username': username,
                        'password': password
                    }),
                    success: function(response) {                    
                        window.location.href = '/dashboard';
                    },
                    error: function(error) {                    
                        console.log(error);
                        alert('Login failed: Invalid username or password.');
                    }
                });
            }else {
                alert('Please enter both username and password.');
            }
            
        });
    });
    // register button
    const registerBtn = document.getElementById('register-btn');
    const registerPopup = document.getElementById('register-popup');
    const closeBtn = document.getElementById('close-popup'); 
    const registerContent = document.querySelector('.popup-content'); 
    if (registerBtn) {
        registerBtn.addEventListener('click', function(event) {
            event.preventDefault();
            registerPopup.style.display = 'block';
        });
   

    }
    //close button
    if (closeBtn) {
        closeBtn.addEventListener('click', function(event) {
            event.preventDefault();
            registerPopup.style.display = 'none';
        });
    }
    //close pop up if click outside of the form
    window.addEventListener('click', function(event) {
        if (registerPopup.style.display === 'block' && !registerContent.contains(event.target)) {
            registerPopup.style.display = 'none';
        }
    });
    // form submission    
    attachRegisterFormListener();
});
function attachRegisterFormListener() {
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const userData = {
                username: document.getElementById('reg-username').value,
                password: document.getElementById('reg-password').value,
                email: document.getElementById('reg-email').value,
                phone: document.getElementById('reg-phone').value
            };
    
            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Registration failed with status ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log('Registration Success:', data);
                //TODO: show pop up message register successfully
                alert('Registration successful!');                
                window.location.href = '/'; //atempt to go login page
            })
            .catch((error) => {
                console.error('Registration Error:', error);
                // TODO: handle errors 
                alert(error.message);

            });
        });
    } else {
        console.error('Register form not found');
    }
}