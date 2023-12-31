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

// Function to handle PDF file upload
window.handlePdfUpload = function() {
    const pdfInput = document.getElementById('pdf-upload');
    const pdfFile = pdfInput.files[0];

    // Prompt the user for the TOTP code
    const userCode = prompt('Please enter the TOTP code:');
    const isValidCode = verifyTOTP(userCode);

    if (isValidCode) {
        if (pdfFile) {
            if (pdfFile.type === 'application/pdf') {
                // PDF file is valid, you can perform actions here
                console.log('Valid PDF file:', pdfFile.name);

                // TODO: Add logic to handle the PDF file, e.g., send it to the server
                // Example: You can use FormData to send the file via AJAX
                const formData = new FormData();
                formData.append('pdfFile', pdfFile);

                fetch('/upload-pdf', {
                    method: 'POST',
                    body: formData,
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Server response:', data);
                    // TODO: Handle the server response as needed
                })
                .catch(error => {
                    console.error('Error uploading PDF:', error);
                    // TODO: Handle errors
                });
            } else {
                alert('Invalid file type. Please upload a PDF document.');
            }
        } else {
            alert('Please choose a PDF document to upload.');
        }
    } else {
        alert('Invalid TOTP code. Please enter the correct code.');
    }
};

// Function to verify TOTP code on the server side
function verifyTOTP(code) {
    // Send the TOTP code to the server for verification
    return fetch('/verify-totp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
    })
    .then(response => response.json())
    .then(data => data.isValid)
    .catch(error => {
        console.error('Error verifying TOTP:', error);
        return false;
    });

}