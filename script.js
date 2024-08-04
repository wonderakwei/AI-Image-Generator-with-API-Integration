// API Configuration
const API_URL = 'http://localhost:3000/api/image/generation';
const API_KEY = '';

// Function to handle form submission
document.querySelector('.generate-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  // Get user input
  const prompt = document.querySelector('.prompt-input').value;
  const quantity = parseInt(document.querySelector('.img-quantity').value, 10);

  if (!prompt) {
    alert('Please enter a description.');
    return;
  }

  try {
    // Show loading indicators
    const imageCards = document.querySelectorAll('.img-card');
    imageCards.forEach(card => card.classList.add('loading'));

    // Prepare request payload
    const payload = {
      prompt: prompt,
      aspect_ratio: "1:1", 
      samples: quantity,
    };

    // Make API request
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': API_KEY,
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();

    // Clear previous images
    const gallery = document.querySelector('.image-gallery');
    gallery.innerHTML = '';

    // Populate gallery with new images
    data.data.forEach((imageData, index) => {
      if (index >= quantity) return;
      const imgCard = document.createElement('div');
      imgCard.classList.add('img-card');
      imgCard.innerHTML = `
        <img src="${imageData.url}" alt="Generated Image">
        <a href="${imageData.url}" class="download-btn" download>
          <img src="images/download-icon.svg" alt="Download">
        </a>
      `;
      gallery.appendChild(imgCard);
    });
  } catch (error) {
    console.error('Error generating images:', error);
    alert('An error occurred while generating images.');
  } finally {
    // Hide loading indicators
    document.querySelectorAll('.img-card.loading').forEach(card => card.classList.remove('loading'));
  }
});
