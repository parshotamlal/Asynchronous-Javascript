
function fetchData() {
  const outputDiv = document.getElementById("output");
  outputDiv.textContent = "Loading..."; // Show loading state

  // Promise to fetch data from dummy API
  const fetchPromise = fetch('https://dummyjson.com/posts')

    .then(response => {
      // Check for successful response
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse JSON if successful
    });

  // Timeout promise to reject after 5 seconds
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Operation timed out.")), 5000)
  );

  // Race between data fetch and timeout
  Promise.race([fetchPromise, timeoutPromise])
    .then(data => {
      // Extract and format post titles
      const postList = data.posts.map(post => `• ${post.title}`).join('\n');
      outputDiv.textContent = `Fetched Posts:\n\n${postList}`;
    })
    
    .catch(error => {
      // Display error message in case of failure or timeout
      outputDiv.textContent = `Error: ${error.message}`;
    });
}
