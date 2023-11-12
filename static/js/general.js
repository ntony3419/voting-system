//registration form
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('register-btn').addEventListener('click', function() {
        document.getElementById('register-popup').style.display = 'block';
    });

    document.getElementById('cancel-btn').addEventListener('click', function() {
        document.getElementById('register-popup').style.display = 'none';
    });
});


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


//function to send data to add a user
function addUser() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const position = document.getElementById('position').value;

    fetch('/add_user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age, position }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Handle success - maybe update the UI or show a message
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle errors here
    });
}

// Attach event listener to the form submit button
document.getElementById('add-user-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submit
    addCandidate();
});


// function to add candidate
document.addEventListener('DOMContentLoaded', function() {
            
    // when click add candidate

    document.getElementById('add-candidate').addEventListener('click', function(event) {
        event.preventDefault(); 
        console.log('Add Candidate clicked'); //show in console the action
        document.querySelector('.main-content').innerHTML = '';

        // show the candidate form
        var formHtml = document.getElementById('candidate-form').innerHTML;
        document.querySelector('.main-content').innerHTML = formHtml;
    });
  
});

// FUNCTION TO VOTE 
// TODO JavaScript function to vote for a candidate
function voteForCandidate(candidateId) {
    // TODO AJAX request to send vote to server
    console.log('Voting for candidate with ID:', candidateId);
    // TODO: Add AJAX call here
}