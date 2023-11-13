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
                    // Redirect to the dashboard or handle the response
                    window.location.href = '/dashboard';
                },
                error: function(error) {
                    // Handle errors here
                    console.log(error);
                }
            });
        });
    });
    // register button
    const registerBtn = document.getElementById('register-btn');
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            // Load the registration form and display it as a popup
            fetch('/path-to-register-html') // Adjust the path to your register.html
                .then(response => response.text())
                .then(html => {
                    document.body.insertAdjacentHTML('beforeend', html);
                    attachRegisterFormListener();
                })
                .catch(error => console.error('Error loading registration form:', error));
        });
    }
});
function attachRegisterFormListener() {
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const userData = {
                username: document.getElementById('username').value,
                password: document.getElementById('password').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value
            };
    
            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Registration Success:', data);
                //TODO: show pop up message register successfully
                registerPopup.style.display = 'none';
            })
            .catch((error) => {
                console.error('Registration Error:', error);
                // TODO: handle errors 
            });
        });
    } else {
        console.error('Register form not found');
    }
}