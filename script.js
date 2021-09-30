// Global Variables
const errorMsg = document.getElementById('error-msg');
const searchResult = document.getElementById('search-result');
const searchKeyword = document.getElementById('search-keyword');
const booksTotal = document.getElementById('books-total');
let inputText;


const searchBooks = () => {
    // prev data clearing
    booksTotal.innerText = "";
    searchResult.innerHTML = "";
    searchKeyword.innerText = "";
    errorMsg.innerText = "";

    const inputField = document.getElementById('search-field');
    inputText = inputField.value;
    inputField.value = "";
    if(inputText===""){
        errorMsg.innerText = "Please insert a valid book name!";
        return;
    }
    

    const url = `https://openlibrary.org/search.json?q=${inputText}`;

    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.docs,data));
}


 const displaySearchResult = (books,data) => {
     if(books.length === 0 || books.message === "NOT FOUND"){
        errorMsg.innerText = `No Books found related to the Keyword: ${inputText}`;
        booksTotal.innerText = "";
        return;
     }

     // search info display
     searchKeyword.innerText = `Searched Keyword: ${inputText}`;
     booksTotal.innerText = `About ${data.numFound} matched result.`;

     books.forEach(book => {
         const div = document.createElement('div');
         div.classList.add('col');
         div.innerHTML = `
         <div class="card h-100">
            <img class="mx-auto" src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title text-center">${book.title}</h3>
                <h6 class="card-title">Author : ${book.author_alternative_name ? book.author_alternative_name : "Not Found!"}</h5>
                <h6 class="card-title">Publisher : ${book.publisher ? book.publisher : "Not Found!"}</h5>
                <p class="card-text">First publish year : ${book.first_publish_year ? book.first_publish_year : "Not Found!"}</p>
            </div>
         </div>
         `;
         searchResult.appendChild(div);
     })
 }