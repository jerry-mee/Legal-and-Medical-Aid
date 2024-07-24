document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");
    checkPageElements();
    try {
        loadProfessionals();
        setupFormSubmission();
    } catch (error) {
        console.error("Error in initialization:", error);
    }
});

function checkPageElements() {
    const elements = ['persons', 'submitForm', 'message'];
    elements.forEach(id => {
        const element = document.getElementById(id);
        if (!element) {
            console.error(`Element with id '${id}' not found`);
        } else {
            console.log(`Element '${id}' found`);
        }
    });
}

function loadProfessionals() {
    console.log("Loading professionals...");
    fetch("data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Data loaded:", data);
            const container = document.querySelector("#persons");
            if (!container) {
                console.error("#persons container not found");
                return;
            }
            data.forEach(card => {
                container.innerHTML += createCard(card);
            });
            console.log("Cards added to DOM");
        })
        .catch(error => {
            console.error("Error loading professionals:", error);
            document.getElementById('message').textContent = 'Error loading data. Please try again later.';
        });
}

function createCard(card) {
    return `
        <div class="card" data-category="${card.category}">
            <h2>${card.name}</h2>
            <p>Profession: ${card.profession}</p>
            <p>Contact: ${card.contact}</p>
            <p>Category: ${card.category}</p>
            <a href="https://twitter.com/${card.twitter}" class="card-twitter" target="_blank">@${card.twitter}</a>
            <button class="share-button" onclick="shareCard(${card.id})">Share on Twitter</button>
        </div>
    `;
}

function filterCategory(category) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (category === 'All' || card.dataset.category === category) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

function shareCard(id) {
    // Implement sharing functionality here
    console.log(`Sharing card with id ${id}`);
}

function setupFormSubmission() {
    const form = document.getElementById('submitForm');
    if (!form) {
        console.error("Submit form not found");
        return;
    }
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const newProfessional = {
            name: document.getElementById('name').value,
            profession: document.getElementById('profession').value,
            contact: document.getElementById('contact').value,
            category: document.getElementById('category').value,
            twitter: document.getElementById('twitter').value
        };
        // In a real application, you would send this data to a server
        // For this example, we'll just add it to the page
        const container = document.querySelector("#persons");
        if (!container) {
            console.error("#persons container not found when adding new professional");
            return;
        }
        container.innerHTML += createCard({...newProfessional, id: Date.now()});
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.textContent = 'Professional added successfully!';
        } else {
            console.error("Message element not found");
        }
        this.reset();
    });
}
