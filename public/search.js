document.addEventListener('DOMContentLoaded', function () {
  const petForm = document.getElementById('petForm');
  const petAddedMessage = document.getElementById('petAddedMessage');
  const petInfo = document.getElementById('petInfo');
  const searchKeywordInput = document.getElementById('searchKeyword');
  const userIcon = document.getElementById('user Icon'); // Assuming the user icon has an ID 'userIcon'

  petForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const formData = new FormData(this);

      // Make a POST request to add a pet
      fetch('/add-pet', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(Object.fromEntries(formData)),
      })
          .then(response => response.json())
          .then(data => {
              // Display pet added message
              petAddedMessage.classList.remove('d-none');

              // Display pet information
              petInfo.innerHTML = `
                  <p><strong>Pet Name:</strong> ${data.petName}</p>
                  <p><strong>Species:</strong> ${data.species}</p>
                  <p><strong>Breed:</strong> ${data.breed}</p>
                  <p><strong>Date of Birth:</strong> ${data.dob}</p>
                  <p><strong>Vaccination Details:</strong> ${data.vaccination}</p>
              `;

              // Show the pet information container
              petInfo.style.display = 'block';

              // Clear the search bar
              searchKeywordInput.value = '';
          })
          .catch(error => {
              console.error('Error:', error);
          });
  });

  // Handle search requests
  searchKeywordInput.addEventListener('input', function () {
      const searchKeyword = this.value.trim().toLowerCase();

      // Make a GET request to search for pets
      fetch(`/search-pets?keyword=${searchKeyword}`)
          .then(response => response.json())
          .then(pets => {
              // Display search results
              displaySearchResults(pets);
          })
          .catch(error => {
              console.error('Error:', error);
          });
  });

  // Handle user icon click event
  userIcon.addEventListener('click', function () {
      const confirmation = window.confirm('Are you sure you want to log out?');
      if (confirmation) {
          // Perform logout actions here
          alert('Logged out!'); // Replace this with actual logout code
      }
  });

  // Function to display search results
  function displaySearchResults(pets) {
      petInfo.innerHTML = '<h2>Search Results</h2>';

      if (pets.length === 0) {
          petInfo.innerHTML += '<p>No matching pets found.</p>';
      } else {
          pets.forEach(pet => {
              petInfo.innerHTML += `
                  <p><strong>Pet Name:</strong> ${pet.petName}</p>
                  <p><strong>Species:</strong> ${pet.species}</p>
                  <p><strong>Breed:</strong> ${pet.breed}</p>
                  <p><strong>Date of Birth:</strong> ${pet.dob}</p>
                  <p><strong>Vaccination Details:</strong> ${pet.vaccination}</p>
                  <hr>
              `;
          });
      }

      // Show the pet information container
      petInfo.style.display = 'block';
  }
});
