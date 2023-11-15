document.addEventListener('DOMContentLoaded', function() {
    //  show the add candidate form
    var addCandidateButton = document.getElementById('add-candidate');

    if (addCandidateButton) {
        addCandidateButton.addEventListener('click', function(event) {
            event.preventDefault(); 
            console.log('Add Candidate clicked');
            showAddCandidateForm();
        });
    }
    //show vote form
    var voteButton = document.getElementById('for-voter');
    if (voteButton) {
        voteButton.addEventListener('click', function(event) {
            event.preventDefault();
            showVoteForm();
        });
    }
    
});
// show vote fomr
function showVoteForm(){
    fetch('/vote')
    .then(response => response.text())
    .then(html => {
        document.querySelector('.main-content').innerHTML = html;
    })
    .catch(error => {
        console.error('Error fetching vote form:', error);
    });
}

function showAddCandidateForm() {
    // show the candidate form    
    fetch('/add-candidate')
    .then(response => response.text())
    .then(html => {
        document.querySelector('.main-content').innerHTML = html;
    })
    .catch(error => {
        console.error('Error fetching add candidate form:', error);
    });
    
}