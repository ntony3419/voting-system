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
    const registerPopup = document.getElementById('register-popup');

    if (registerBtn && registerPopup) {
        registerBtn.addEventListener('click', function() {
            registerPopup.style.display = 'block';
        });
    }
});