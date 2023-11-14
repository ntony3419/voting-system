
    document.addEventListener('DOMContentLoaded', function() {
        // ... Your existing code ...

        // Attach event listener to the registration form submit button
        document.getElementById('register-form').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submit
            registerUser();
        });
    });

    async function registerUser() {
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;
        const email = document.getElementById('reg-email').value;
        const phone = document.getElementById('reg-phone').value;
        // Add more fields as needed

        // Generate a random key for this transaction
        const randomKey = await generateRandomKey();

        // Encrypt user data
        const encryptedUsername = await encryptText(randomKey, username);
        const encryptedPassword = await encryptText(randomKey, password);
        const encryptedEmail = await encryptText(randomKey, email);
        const encryptedPhone = await encryptText(randomKey, phone);
        // Add more fields as needed

        // Send the encrypted data and the random key to the server
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: encryptedUsername,
                password: encryptedPassword,
                email: encryptedEmail,
                phone: encryptedPhone,
                // Add more fields as needed
                key: btoa(String.fromCharCode.apply(null, new Uint8Array(randomKey)))
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Registration Success:', data);
            // TODO: show pop up message register successfully
            registerPopup.style.display = 'none';
        })
        .catch((error) => {
            console.error('Registration Error:', error);
            // TODO: handle errors
        });
    }

 
