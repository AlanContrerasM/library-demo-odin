"use strict";
const formDisplay = document.querySelector("form");
const newBookButton = document.querySelector("#newBook");
const cardContainer = document.querySelector("#cardContainer")
let readButtons = document.querySelectorAll(".readButton");
//creating myLibrary array to store all books
let myLibrary = [];


//Books constructor
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//functions of object constructor are better outside as prototype
Book.prototype.info = function(){
    console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`)
}

//object for storing functions regarding array myLibrary Manipulation
const libraryManipulation = {
    deleteBook: (index) =>{ //delete a book through index
        myLibrary.splice(index,0);
    },
    addBook: (bookObject) => {
        myLibrary.push(bookObject);
        bookObject.info();
    },
    createDefaultBook: () =>{
        libraryManipulation.addBook(new Book("The Underdog"
                                        , "Alan Contreras"
                                        , 296
                                        , true));
    },
    createCard: (book,i) =>{
        //creating container card
        const card = document.createElement("div");
        card.classList.add("card");

        //creating first child h3
        const title = document.createElement("h3");
        title.classList.add("title");
        title.textContent = `${book.title}`;



        //creating the next p elements, author and pages
        const author = document.createElement("p");
        author.classList.add("author")
        author.textContent = `${book.author}`;

        const pages = document.createElement("p");
        pages.classList.add("pages")
        pages.textContent = `${book.pages} pages`;



        let cardButtons = document.createElement("div");
        cardButtons.classList.add("cardButtons");

        let readButton = document.createElement("div");
        readButton.setAttribute("class", "cardButton readButton");
        if(book.read){ 
            readButton.textContent = "Already read"
        }else{readButton.textContent = "Not read yet"}

        let deleteButton = document.createElement("div");
        deleteButton.setAttribute("class", "cardButton deleteButton");
        deleteButton.textContent = "Delete";

        cardButtons.appendChild(readButton);
        cardButtons.appendChild(deleteButton);

        //appending childs to card
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(cardButtons);
        card.id = `${i}`;

        return card;
    },

}



//storing functions inside this domManipulation object
const domManipulation = {
    displayForm: ()=>{formDisplay.style.visibility = "visible"},
    hideForm: ()=>{formDisplay.style.visibility = "hidden"},
    clearCardContainer: ()=>{cardContainer.innerHTML = ""},
    updateCardContainer: () =>{
        domManipulation.clearCardContainer();

        myLibrary.forEach((book, index)=>{
            let newCard = libraryManipulation.createCard(book,index);
            cardContainer.appendChild(newCard);
        });

        domManipulation.updateEventListeners();
    },
    updateEventListeners: () =>{
        readButtons = document.querySelectorAll(".readButton");


        readButtons.forEach((button) =>{
            button.addEventListener("click", ()=>{console.log("works")})
        })
    }
}


//Event listeners for addBook form
newBookButton.addEventListener("click", domManipulation.displayForm)

formDisplay.addEventListener("submit", e=>{
    //first we prevent the default submit
    e.preventDefault();
    domManipulation.hideForm();
    domManipulation.clearCardContainer();
    
});






// creating first Book
libraryManipulation.createDefaultBook();
libraryManipulation.createDefaultBook();

domManipulation.updateCardContainer();

//card 
/* <div class="card">
          <h3 class="title">Title</h3>
          <p class="author">Rick</p>
          <p class="pages">295 pages</p>
          <div class="cardButtons">
            <diV class=" cardButton readButton">Already read</diV>
            <div class="cardButton deleteButton">Delete</div>
          </div>
        </div> */
