document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault(); //prevent the default form submit

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
