// Simulated data for demonstration purposes
const petsData = [
    { id: 1, name: 'Buddy', type: 'Dog', breed: 'Golden Retriever' },
    { id: 2, name: 'Whiskers', type: 'Cat', breed: 'Siamese' },
    // Add more pet data as needed
];

document.addEventListener('DOMContentLoaded', function () {
    // Populate featured pets section
    const featuredPetsList = document.getElementById('featured-pets-list');
    petsData.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.classList.add('pet-card');
        petCard.innerHTML = `<h3>${pet.name}</h3><p>${pet.type} - ${pet.breed}</p>`;
        featuredPetsList.appendChild(petCard);
    });

    // Handle search form submission
    const searchForm = document.getElementById('search-form');
    const searchResults = document.getElementById('search-results');

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const petType = document.getElementById('pet-type').value;
        const results = petsData.filter(pet => pet.type === petType);

        if (results.length > 0) {
            searchResults.innerHTML = '';
            results.forEach(result => {
                const resultCard = document.createElement('div');
                resultCard.classList.add('search-result-card');
                resultCard.innerHTML = `<h3>${result.name}</h3><p>${result.type} - ${result.breed}</p>`;
                searchResults.appendChild(resultCard);
            });
        } else {
            searchResults.innerHTML = '<p>No results found.</p>';
        }
    });
});
