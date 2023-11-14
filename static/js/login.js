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
        if (!registerContent.contains(event.target) && event.target !== registerBtn) {
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