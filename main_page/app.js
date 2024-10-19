const form = document.querySelector('#searchForm');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    
    // Get the search term from the form
    const searchTerm = form.elements.query.value;
    
    // Define the API key and URL for the OMDb API
    const apiKey = 'acf3c869'; // Your OMDb API key
    const url = 'http://www.omdbapi.com/';
    
    // Create the configuration for the API call
    const config = {
        params: {
            s: searchTerm,   // 's' is for searching by title
            apikey: apiKey   // Include your API key
        }
    };
    
    // Make the API request using Axios
    const res = await axios.get(url, config);
    
    // Call the function to handle the results
    makeImages(res.data.Search);
    
    // Clear the search input
    form.elements.query.value = '';
});

// Function to create image elements for the search results
const makeImages = (movies) => {
    // Clear any existing images or divs before adding new ones
    document.querySelectorAll('.movie-container').forEach(div => div.remove());
    
    // Loop over the results and create a div and image for each one
    for (let result of movies) {
        if (result.Poster !== 'N/A') {
            // Create a new div to contain the image
            const div = document.createElement('div');
            div.classList.add('movie-container'); // Add a class for styling if needed
            
            // Create the image element
            const img = document.createElement('IMG');
            img.src = result.Poster;
            
            // Append the image to the div
            div.appendChild(img);
            
            // Append the div to the body
            document.body.append(div);
        }
    }
}