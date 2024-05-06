const container = document.getElementsByClassName("container")[0]; // container classlı elementin tapılması

fetch('http://localhost:3000') // server portuna api sorğu
    .then(response => {
        if (!response.ok) {
            throw new Error('Sorğuda problem var');
        }
        return response.json(); // responsun JSON formatına çevrilməsi
    })
    .then(data => {
        // data gəldikdən sonra icra olunan əməliyyatlar
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
            // HTML ə əlavə olunması üçün yeni div elementinin yaradılması
            const bookCardDiv = document.createElement('div');
            bookCardDiv.innerHTML = book_card; // div elementinin daxiliində olan elementlərin İnnerHTML ilə daxil edilməsi
            container.appendChild(bookCardDiv); // div elementinin append vasitəsi ilə HTMLə göndərilməsi
        });
    })
    .catch(error => {
        // Errorlar
        console.error('datanın əldə edilməsi zamanı problem yarandı', error);
    });
