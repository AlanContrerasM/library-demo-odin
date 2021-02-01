"use strict";
const formDisplay = document.querySelector("form");
const newBookButton = document.querySelector("#newBook");
const cardContainer = document.querySelector("#cardContainer")
let readButtons = document.querySelectorAll(".readButton");
let deleteButtons = document.querySelectorAll(".deleteButton");
let submitButton = document.querySelector('input[type="submit"]')
//creating myLibrary array to store all books
let myLibrary = [];
//setting up localStorage
const localStorage = window.localStorage;


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
        console.table(myLibrary);
        console.log("Deleting book at index >>" + index);
        myLibrary.splice(index,1);
        libraryManipulation.populateStorage();
    },
    addBook: (bookObject) => {
        myLibrary.push(bookObject);
        bookObject.info();
        libraryManipulation.populateStorage();
    },
    changeRead: (index) =>{
        if(myLibrary[index].read){
            myLibrary[index].read = false;
        }else{
            myLibrary[index].read = true;
        }
        libraryManipulation.populateStorage();
    },
    populateStorage: () =>{
        let newString = "";
        
        myLibrary.forEach((book)=>{
            Object.values(book).forEach(val =>{
                newString += val + "---";
            })
            newString += ":;"
        })
        newString = newString.slice(0,-2);
        localStorage.setItem("myLibrary",newString)
    },
    populateMyLibrary: ()=>{
        let arrayOfBooks = localStorage.getItem("myLibrary").split(":;");

        myLibrary = [];
        
        arrayOfBooks.forEach(book=>{
            let arr=book.split("---");
            myLibrary.push(new Book(arr[0], arr[1], arr[2], arr[3]=== "true"? true: false));
        })
    },
    createDefaultBook: () =>{
        libraryManipulation.addBook(new Book("The Underdog"
                                        , "Alan Contreras"
                                        , 42
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
        deleteButtons = document.querySelectorAll(".deleteButton");


        readButtons.forEach((button) =>{
            button.addEventListener("click", (e)=>{
                libraryManipulation.changeRead(e.target.parentNode.parentNode.id);
                domManipulation.updateCardContainer();
            })
        })

        deleteButtons.forEach((button)=>{
            button.addEventListener("click", (e)=>{
                //id is on card div, parent of parent of button
                libraryManipulation.deleteBook(e.target.parentNode.parentNode.id);
                console.table(myLibrary);
                domManipulation.updateCardContainer();
            })
        })
    }
}



//Event listeners for addBook form
newBookButton.addEventListener("click", domManipulation.displayForm)

//just displaying message if form is not filled properly
submitButton.addEventListener("click", ()=>{
    if(!formDisplay.checkValidity()){
        submitButton.value="Something is missing";
    }
})

formDisplay.addEventListener("submit", e=>{
    //first we prevent the default submit
    e.preventDefault();
    domManipulation.hideForm();

    let title = document.querySelector("#formTitle");
    let author = document.querySelector("#formAuthor");
    let pages = document.querySelector("#formPages");
    let read = document.querySelector("#formRead");

    libraryManipulation.addBook(
        new Book(title.value, author.value, pages.value,
            read.checked? true: false)
    )

    domManipulation.updateCardContainer();


    
});



if(localStorage.getItem("myLibrary") == null){
    // creating first Book
    libraryManipulation.createDefaultBook();
    libraryManipulation.createDefaultBook();

    domManipulation.updateCardContainer();
}else if(localStorage.getItem("myLibrary") == ""){
    //do nothing
}else{
    libraryManipulation.populateMyLibrary();
    domManipulation.updateCardContainer();
}




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
