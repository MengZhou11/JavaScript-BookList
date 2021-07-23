//Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI Constructor
function UI(){
    //add a book
    UI.prototype.addBookToList = function(book){
        const list = document.getElementById('book-list');
        //creat tr element
        const row = document.createElement('tr');
        //insert cols 注意这里的符号很特别
        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class = "delete">X</a></td>
        `;

        list.appendChild(row);
    }
    //show alert
    UI.prototype.showAlert = function(message, className){
    //create div
    const div = document.createElement('div');
    //add classes
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    //get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div,form);

    //disappear after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },2000);


    }

    //delete book
    UI.prototype.deleteBook= function(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }


    // clear fields
    UI.prototype.clearFields = function(){
        document.getElementById('title').value='';
        document.getElementById('author').value='';
        document.getElementById('isbn').value='';
    }
}

//Event Listeners for adding a book
document.getElementById('book-form').addEventListener('submit', 
function(e){
    //get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value 


    //instantiate book
    const book = new Book(title, author, isbn);

    //instantiate UI
    const ui = new UI();

    //validate
    if(title==='' ||author==='' ||isbn==='' ){
        //error alert
        ui.showAlert('Please fill in all fields', 'error');
    }else{
    //add book to list and clear fields
    ui.addBookToList(book);
    ui.showAlert('Book Added!', 'success');
    ui.clearFields();
    }


    e.preventDefault();
    
});


//Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteBook(e.target);

    ui.showAlert('Book Removed', 'success');
    e.preventDefault();
});
