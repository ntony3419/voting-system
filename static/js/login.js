document.addEventListener('DOMContentLoaded', function() {
  // Login button
    $(document).ready(function() {
        $('form').on('submit', function(e) {
            e.preventDefault(); // Prevent the default form submission

            $.ajax({
                type: 'POST',
                url: '/login',
                data: {
                    username: $('#username').val(),
                    password: $('#password').val()
                },
                success: function(response) {                    
                    window.location.href = '/dashboard';
                },
                error: function(error) {                    
                    console.log(error);
                }
            });
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
                    throw new Error('Registration failed, please try again.');
                }
                return response.json();
            })
            .then(data => {
                console.log('Registration Success:', data);
                //TODO: show pop up message register successfully
                alert('Registration successful!');
                registerPopup.style.display = 'none';
                window.location.href = '/'; //atempt to go login page
            })
            .catch((error) => {
                console.error('Registration Error:', error);
                // TODO: handle errors 
                alert('Registration failed, please try again.');
            });
        });
    } else {
        console.error('Register form not found');
    }
}