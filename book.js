// search book
const searchBooks = () => {
    // search field 
    const searchFiled = document.getElementById('input-field');
    const searchText = searchFiled.value;
    if (searchText == '') {
        alert("Please write book name");
    }
    else {
        // clear input data 
        searchFiled.value = '';
        // load data 
        const url = `http://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayBooks(data))

    }
    toggleSpinner('block');
}
//load spinnier
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

// Display result 
const displayBooks = data => {
    // show total search result 
    let totalResult = document.getElementById('total-results');
    totalResult.innerHTML = `<h2>Total Book Found: ${data.numFound}</h2>`

    //slicing books array to display
    const books = data.docs.slice(0, 40);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    // show total displaid 
    let totalDisplaid = document.getElementById('total-displaid');
    totalDisplaid.innerHTML = `<h3>Total Book Displaid: ${books.length}</h3>`;

    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
        <img height="300px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top">
            <div class="card-body">
                <h4 class="card-title">'${book.title}'</h4>
                <h6 class="card-text">Author Name: ${book.author_name ? book.author_name.slice(0, 1) : 'Author Not Found'}</h6>
                <h6 class="card-text">Publisher: ${book.publisher ? book.publisher.slice(0, 1) : 'Publisher Not Available'}</h6>
                <h6 class="card-text">First publish year: ${book.first_publish_year}</h6>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    });
    toggleSpinner('none');
}

