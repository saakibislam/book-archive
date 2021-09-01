function loadBooks() {
    const inputTextField = document.getElementById("inputText");
    const inputText = inputTextField.value;
    inputTextField.value = '';

    const url = `http://openlibrary.org/search.json?q=${inputText}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayBooks(data))
}
function displayBooks(data) {
    const showResultsField = document.getElementById("showResults");
    showResultsField.innerHTML = '';
    const booksFound = data.num_found;

    const h1 = document.createElement('h1');
    h1.innerText = `${booksFound} results found`;
    showResultsField.appendChild(h1);

    const books = data.docs;
    const booksContainer = document.getElementById("booksContainer");
    booksContainer.innerHTML = '';

    books.forEach(book => {
        // console.log(book);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card rounded">
            <img class="card-img-top" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">${book.subject}</p >
            </div >
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><b>Author</b>: ${book.author_name}</li>
                <li class="list-group-item"><b>Publish Year</b>: ${book.publish_year}</li>
                <li class="list-group-item"><b>Publisher</b>: ${book.publisher}</li>
            </ul>
            <div class="card-footer">
                <small class="text-muted">First Published in ${book.first_publish_year}</small>
            </div>
         </div >
    `;
        booksContainer.appendChild(div);
    });

}

/*
<div class="col">
    <div class="card">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.</p>
        </div>
        <div class="card-footer">
             <small class="text-muted">Last updated 3 mins ago</small>
        </div>
    </div>
</div>
*/