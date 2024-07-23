document.getElementById('submitForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const newProfessional = {
        name: document.getElementById('name').value,
        profession: document.getElementById('profession').value,
        contact: document.getElementById('contact').value,
        category: document.getElementById('category').value,
        twitter: document.getElementById('twitter').value
    };

    fetch('submit-professional.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProfessional)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('message').textContent = 'Thank you! Your information has been submitted.';
            document.getElementById('submitForm').reset();
        } else {
            document.getElementById('message').textContent = 'There was an error submitting your information. Please try again.';
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'There was an error submitting your information. Please try again.';
    });
});
