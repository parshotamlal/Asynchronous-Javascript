
  function executeWithCallback() {
    const outputDiv = document.getElementById('output');
    outputDiv.textContent = "Waiting for 5 seconds...";
    simulateDelay(fetchDataAndDisplay);
  }
  // This function waits for 5 seconds, then runs another function
function simulateDelay(callback) {
    setTimeout(callback, 5000); // Wait 5000 milliseconds (5 seconds), then call the given function
  }
  
  // This function gets data from a website and shows it on the screen
  function fetchDataAndDisplay() {
    const outputDiv = document.getElementById('output'); // Find the box where we will show the result
  
    // Get some post data from the internet
    fetch('https://dummyjson.com/posts')
      .then(response => response.json()) // Turn the response into a JavaScript object
      .then(data => {
        // Show a message and the first 5 post titles
        outputDiv.innerHTML = "<strong>Callback executed after 5 seconds</strong><br><br>";
        data.posts.slice(0, 5).forEach(post => {
          outputDiv.innerHTML += `• ${post.title}<br>`; // Add each post title to the box
        });
      })
      .catch(error => {
        // If something goes wrong its show an error message
        outputDiv.innerHTML = "Error fetching data.";
        console.error(error); // Print the error in the console
      });
  }
  
  // This function runs when the button is clicked
  function executeWithCallback() {
    const outputDiv = document.getElementById('output'); // Find the box where we show the message
    outputDiv.textContent = "Waiting for 5 seconds..."; // Show waiting message
  
    simulateDelay(fetchDataAndDisplay); // Wait 5 seconds, then get and show the data
  }
  