document.addEventListener('DOMContentLoaded', function() {
    //  show the add candidate form
    document.getElementById('add-candidate').addEventListener('click', function(event) {
        event.preventDefault(); 
        console.log('Add Candidate clicked'); // show in console the action
        showAddCandidateForm();
    });
    //show vote form
    document.querySelector('a[href="/vote"]').addEventListener('click', function(event) {
        event.preventDefault();
        console.log('Vote clicked');
        showVoteForm();
    });
    
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