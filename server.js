const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet'); // adds a bunch of standard security to server
const Book = require('./models/Book.js');
require('dotenv').config();
require('./config/db.js');
const PORT = 3000;


const app = express();


// START MIDDLEWARE //
app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(morgan('dev'));
app.use(helmet());
// END MIDDLEWARE //

// START ROUTES //


// findById

app.get('/books/:id', async (req, res) => {

    let dbResponse =  await Book.findById(req.params.id);
    res.send(dbResponse);

})


// find   - finds everything
// .find()
 
app.get('/books', async (req, res) => {
    // get all books
    let books =  await Book.find(books);
    res.send(books);
})

// insertMany
app.post('/books', async (req, res) => {
    // in the request there should be an array of books objects.
    let books = req.body.books;

    let dbResponse =  await  Book.insertMany(books);
    res.send(dbResponse);
})

// findOne





// findById

app.put('/books/:id', async (req, res) => {
    let id = req.params.id;
    let response = await Book.findByIdAndUpdate(id,  req.body, { new: true } );
    console.log(response);
    res.send(response)
});


app.delete('/books/:id', async (req, res) => {
     // .findByIdAndDelete()
     let id = req.params.id;
    let dbResponse =  await Book.findByIdAndDelete(id);
    res.send('delete book');


 

})
// END ROUTES //

app.listen(PORT, () => {
    console.log(`Server LIVE on port ${PORT}`);
});