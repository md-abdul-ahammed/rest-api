/*------------------------------------------
 spinner add result information management
 -------------------------------------------*/
const getInput = (name, display) => {
    const inputField = document.getElementById(name);
    inputField.style.display = display;
}
/*---------------------- 
search book & get api 
------------------------*/
const searchBook = () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    console.log(searchText)
    searchField.value = '';
    getInput('spinner', 'block')
    getInput('result-information', 'none');
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data))
}
/*----------------------------------
result information management here 
-----------------------------------*/
const displayResult = books => {
    const bookList = books.docs;
    const searchResultsCount = document.getElementById('search-result-count')
    let count = 0;
    const searchResults = document.getElementById('search-result')
    searchResults.textContent = '';
    searchResultsCount.textContent = '';
    getInput('spinner', 'none')
    if (books.numFound === 0) {
        searchResultsCount.innerHTML = `
    <p class='container'>Total Result: ${books.numFound}</p>
    <p class='container'>Showing Result: ${count}</p>
    `
        getInput('result-information', 'block');
    }
    bookList.forEach(book => {
        console.log(book)
        if (book.cover_i) {
            count++;
            const div = document.createElement('div');
            div.classList.add('col')
            div.innerHTML = `
            <div class="card border-info h-100 shadow-sm">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="border-bottom border-primary card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p><i>by <small><b>${book.author_name ? book.author_name[0] : ""}</b></small><i/></p>
                </div>
                <div class="card-footer bg-transparent border-primary">
                <small >Publisher:</br> <b>${book.publisher}</b></small>               
                </div>
                <div class="card-footer bg-transparent border-primary">
                <small>First Publish Year : <b>${book.first_publish_year}</b></small>                
                </div>
            </div>
        `
            searchResults.appendChild(div)
        }
        searchResultsCount.innerHTML = `
            <p class='container'>Total Result: ${books.numFound}</p>
            <p class='container'>Showing Result: ${count}</p>
        `
    });

}

