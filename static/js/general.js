
document.addEventListener('DOMContentLoaded', function() {


    
    // Attach event listener to the form submit button
    document.getElementById('add-user-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submit
        addUser();
    });



    // function to add candidate            
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