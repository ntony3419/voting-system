document.addEventListener('DOMContentLoaded', function() {
    //  show the add candidate form
    document.getElementById('add-candidate').addEventListener('click', function(event) {
        event.preventDefault(); 
        console.log('Add Candidate clicked'); // show in console the action
        showAddCandidateForm();
    });
});

function showAddCandidateForm() {
    // show the candidate form
    
    fetch('/add_candidate')
    .then(response => response.text())
    .then(html => {
        document.querySelector('.main-content').innerHTML = html;
    })
    .catch(error => {
        console.error('Error fetching add candidate form:', error);
    });
    
}