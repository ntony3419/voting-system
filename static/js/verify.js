document.addEventListener('DOMContentLoaded', function() {
    const codeVerificationForm = document.getElementById('code-verification-form');
    if (codeVerificationForm) {
        codeVerificationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const code = document.getElementById('code').value;
            fetch('/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ 'code': code }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.redirect) {
                    window.location.href = data.redirect;
                } else {
                    alert('Incorrect code. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
        });
    }
});
