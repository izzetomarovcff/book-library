const container = document.getElementsByClassName("container")[0]; // Get the first element with class "container"

fetch('http://localhost:3000')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Assuming response is JSON, adjust accordingly
    })
    .then(data => {
        // Handle the data received
        console.log(data);
        data.forEach(item => {
            let book_card = `
            <div class="card">
                <div class="image">
                    <img src="${item.book_image_url}" alt="book_image">
                </div>
                <div class="about">
                    <h3 class="book-name">${item.book_name}</h3>
                    <h4 class="author">${item.book_author}</h4>
                    <div class="summary">${item.book_summary}</div>
                </div>
            </div>
            `;
            // Create a new div element to hold the book card HTML
            const bookCardDiv = document.createElement('div');
            bookCardDiv.innerHTML = book_card; // Set the innerHTML of the div to the book_card HTML
            container.appendChild(bookCardDiv); // Append the div's contents to the container
        });
    })
    .catch(error => {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
    });
