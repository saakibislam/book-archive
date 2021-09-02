const showResultsField = document.getElementById("showResults");

// loading book details 
const loadBooks = () => {
    const inputTextField = document.getElementById("inputText");
    const inputText = inputTextField.value;
    inputTextField.value = '';

    const url = `http://openlibrary.org/search.json?q=${inputText}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayBooks(data))
}
// displaying books in cards
const displayBooks = data => {
    // how many results found
    showResultsField.innerHTML = '';
    const booksFound = data.num_found;
    const h1 = document.createElement('h1');
    h1.classList.add('text-center');
    h1.innerText = `${booksFound} results found`;
    showResultsField.appendChild(h1);
    if (booksFound === 0) {
        alert("Please don't write habijabi");
    } else {
        //forEach loop to set card values dynamically
        const books = data.docs;
        // console.log(books)
        const booksContainer = document.getElementById("booksContainer");
        booksContainer.innerHTML = '';

        books.forEach(book => {
            // console.log(book.title)
            // console.log(book.subject);

            const bookTitle = book.title;
            const bookCover = book.cover_i;
            const subjects = book.subject;

            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div onclick="loadBookDetail(${bookCover}, '${bookTitle}', '${subjects}')" class="card rounded">
            <img src="https://covers.openlibrary.org/b/id/${bookCover}-M.jpg" class="card-img-top" style="height:380px" alt = "..." >
            <div class="card-body">
                <h5 class="card-title">${bookTitle}</h5>
            </div >
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><small><b>Author</b>: ${book.author_name}</small></li>
                <li class="list-group-item"><small><b>Publish Date</b>: ${book.publish_date}</small></li>
                <li class="list-group-item"><small><b>Publisher</b>: ${book.publisher}</small></li>
            </ul>
            <div class="card-footer">
                <small class="text-muted">First Published in ${book.first_publish_year}</small>
            </div>
        </div >
    `;
            booksContainer.appendChild(div);
        });
    }
}

// showing details information of a book
const loadBookDetail = (coverId, title, subjects) => {
    // console.log(coverId);
    // console.log(title);
    // console.log(subjects);
    showResultsField.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('w-50', 'mx-auto')
    div.innerHTML = `
                <div class="card mb-3" style = "max-width: 540px;" >
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="https://covers.openlibrary.org/b/id/${coverId}-M.jpg" class="w-100 rounded-start" alt="Book Cover Image">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${subjects.slice(0, 100)}</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
`;
    showResultsField.appendChild(div);
}