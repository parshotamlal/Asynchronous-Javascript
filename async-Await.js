// This code fetches posts from a dummy API and display them on the page
async function fetchPosts() {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = 'Loading...';

   // Handle timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout
    
// Fetch posts from the API
    try {
      const response = await fetch('https://dummyjson.com/posts', {
        signal: controller.signal
      });

      //Clear timeout once data is fetched
      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      //Shuffle posts and pick 5 random ones
      const shuffled = data.posts.sort(() => 0.5 - Math.random());
      const posts = shuffled.slice(0, 5);

      //Format and display the posts
      const formattedPosts = posts.map(post => `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      `).join('');

      outputDiv.innerHTML = formattedPosts;

     // If post is not found show a massage error
    } catch (error) {
      if (error.name === 'AbortError') {
        outputDiv.innerHTML = '<span class="error">Request timed out. Please try again.</span>';
      } else {
        outputDiv.innerHTML = `<span class="error">Error: ${error.message}</span>`;
      }
      console.error('Fetch error:', error);
    }
  }