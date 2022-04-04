
// TODO
// [x] form validation
// [x] UI improvements
// [x] Reformat Add book button
// [x] Popup form
// [x] Close popup on submit
// [x] New book button to initiate form pop up
// [x] Remove read boolean from form

// FIXME
// [x] form switch functionality

// Array containing all books
let myLibrary = [];

// popup functionality for submit book form
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const closeModalOnSubmit = document.querySelectorAll('[data-close-after-submit')
const overlay = document.getElementById('overlay')
console.log(openModalButtons);

// opens popup
openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal);
  })
})

// Close popup on submit
closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    closeModal(modal);
  })
})

// Form Validation
closeModalOnSubmit.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    const isTitleValidated = document.getElementById('title');
    const isAuthorValidated = document.getElementById('author');
    const isPagesValidated = document.getElementById('pages');
    if (isTitleValidated.checkValidity() && isAuthorValidated.checkValidity() && isPagesValidated.checkValidity()) {
      closeModal(modal);
    } else {
    }   
  });
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal);
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active');
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active');
  overlay.classList.remove('active')
}

// create a book Card
function createNewBookCard(book) {
    // creation of Card elements
    const divCard = document.createElement('div');
    const divContainer = document.createElement('div');
    const title = document.createElement('h4');
    const titleContent = document.createElement('p');
    const author = document.createElement('h4');
    const authorContent = document.createElement('p');
    const pages = document.createElement('h4');
    const pagesContent = document.createElement('p');
    const read = document.createElement('h4');
    const readContent = document.createElement('p');
    // creation of switch elements
    const divSwitch = document.createElement('div');
    const labelSwitch = document.createElement('label');
    const inputSwitch = document.createElement('input');
    const spanSwitch = document.createElement('span');
    // creation of remove button elements
    const divRemoveButton = document.createElement('div');
    const removeButton = document.createElement('button');

    // create Card classes
    divCard.classList.add('card');
    divContainer.classList.add('container');
    divRemoveButton.classList.add('removeCard');

    // create rounded switch classes
    labelSwitch.classList.add('switch');
    spanSwitch.classList.add('slider', 'round');

    // Set inputSwitch as checkbox type with id autoSwitch
    inputSwitch.setAttribute("type", "checkbox");
    // Set inputSwitch with class and book unique identifier
    inputSwitch.classList.add('autoSwitch-' + book.bookID);

    // Set removeButton as a submit type
    removeButton.setAttribute("type", "submit");

    // Create header text for elements
    const textTitle = document.createTextNode('Title');
    const textAuthor = document.createTextNode('Author');
    const textPages = document.createTextNode('Number of Pages');
    const textRead = document.createTextNode('Book Read?');

    // Add repeated header data to main elements of card
    title.appendChild(textTitle);
    author.appendChild(textAuthor);
    pages.appendChild(textPages);
    read.appendChild(textRead);

    // add Book data to elementContent variables
    titleContent.textContent = book.title
    authorContent.textContent = book.author
    pagesContent.textContent = book.pages
    // readContent.textContent = book.read
    
    // Organize and render header elements to card
    document.getElementById('libContainer').appendChild(divCard);
    divCard.appendChild(divContainer);
    divContainer.appendChild(title);
    divContainer.appendChild(author);
    divContainer.appendChild(pages);
    divContainer.appendChild(read);

    // Organize and render content of elements to page
    title.insertAdjacentElement("afterend", titleContent);
    author.insertAdjacentElement("afterend", authorContent);
    pages.insertAdjacentElement("afterend", pagesContent);
    read.insertAdjacentElement("afterend", readContent);

    // Organize and render rounded switch. This switch indicates whether book was read
    divContainer.appendChild(divSwitch);
    divSwitch.appendChild(labelSwitch);
    labelSwitch.appendChild(inputSwitch);
    inputSwitch.insertAdjacentElement("afterend", spanSwitch);

    // Give removeButton text
    removeButton.textContent = "Remove"

    // Render removeButton after container
    divContainer.insertAdjacentElement("afterend", divRemoveButton);
    divRemoveButton.appendChild(removeButton);

    // Remove book from library functionality
    removeButton.onclick = function() {
      divCard.remove();
    }
    switchRead(book);
}

// functionality for checking if read and switch button control
function switchRead(book) {
  if (book.read === true) {
    // saves the switch setting based on the instance for submission to the Book object
    document.querySelector(".autoSwitch-"+ book.bookID).checked = true;
  } else {
    document.querySelector(".autoSwitch-" + book.bookID).checked = false;
  }
}

// create unique ID for use by Book object
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Book class
class Book {
  constructor(title, author, pages, read) {
    this.bookID = uuid()  // integer
    this.title = title    // string
    this.author = author  // string
    this. pages = pages   // integer
    this. read = read     // boolean
  }
}

// User Input
const bookSubmitForm = document.querySelector("#bookSubmit");

bookSubmitForm.addEventListener("submit",  (event) => {
  const bookTitle = document.querySelector("#title").value;
  const bookAuthor = document.querySelector("#author").value;
  const bookPages = document.querySelector("#pages").value;
  const bookRead = document.querySelector("#read").checked;

  const submittedBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);

  myLibrary.push(submittedBook)

  // bookSubmitForm.submit();
  bookSubmitForm.reset();
	// stop form submission
	event.preventDefault();
  addBooksToCard(myLibrary)
});

// add eventListener for changing book.read when rounded switch is pressed

/// Add book data contained in myLibrary to a Card
function addBooksToCard(myLibrary) {
  myLibrary.forEach(function(e, i, book) {
    // calls createNewBookCard only on the most recent form submission
    if(i != myLibrary.length - 1) {
      // do nothing
    } else {
      createNewBookCard(e);
      console.log(e);
    }
  })
};