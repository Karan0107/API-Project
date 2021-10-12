require("dotenv").config();

//importing the express
const express = require("express");
var bodyParser = require("body-parser");

//importing out other js file containing the data
const database = require("./database/database");

//Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database//publication");

//initializing express
const booky= express();

booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

//fetching the data by using get method and displaying using the return method

//to get all the books
booky.get("/", async (req,res) => {
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
});

//to get specific book
booky.get("/is/:isbn",async (req,res) => {
  const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn});

  if(!getSpecificBook){
    return res.json({error: `No Book found for ISBN No.: ${req.params.isbn}`});
  }
  return res.json({book:getSpecificBook});
});

//to get list of books based on category
booky.get("/c/:category",async (req,res) => {
  const getSpecificBook = await BookModel.findOne({category: req.params.category});

  if(getSpecificBook == null){
    return res.json({error: `No Book found for ${req.params.category} category`});
  }
  return res.json({book:getSpecificBook});
});

//to get list of books based on language
/*booky.get("/lang/:language",(req,res)=>{
  const getSpecificBook = database.books.filter(
    (book)=> book.language.includes(req.params.language)
  )

  if(getSpecificBook.length === 0){
    return res.json({error:`No book found for language ${req.params.language}`})
  }
  return res.json({book:getSpecificBook});
});*/

booky.get("/lang/:language",async(req,res)=>{
  const getSpecificBook = await BookModel.findOne({language:req.params.language});

  if(!getSpecificBook.length){
    return res.json({error:`No book found for language ${req.params.language}`})
  }
  return res.json({book:getSpecificBook});
});

/********************************************************************/

//to get all the authors
booky.get("/author", async (req,res) => {
  const getAllAuthors = await AuthorModel.find();
  return res.json(getAllAuthors);
});

//to get specific author
/*booky.get("/author/:name",(req,res)=>{
  const getSpecificAuthor = database.author.filter(
    (author)=> author.name.includes(req.params.name)
  )

  if(getSpecificAuthor.length === 0){
    return res.json({error:`Cannot get the author of name ${req.params.name}`});
  }
  return res.json({author:getSpecificAuthor});
});*/

booky.get("/author/:name",async (req,res)=>{
  const getSpecificAuthor = await AuthorModel.findOne({name:req.params.name});

  if(!getSpecificAuthor){
    return res.json({error:`Cannot get the author of name ${req.params.name}`});
  }
  return res.json({author:getSpecificAuthor});
});

//to get list of books based on books
/*booky.get("/author/book/:isbn", (req,res) => {
  const getSpecificAuthor = database.author.filter(
    (author) => author.books.includes(req.params.isbn)
  );

  if(getSpecificAuthor.length===0){
      return res.json({error: `Cannot get Book ${req.params.isbn}`});
  }
  return res.json({author: getSpecificAuthor});
});*/

booky.get("/author/book/:isbn", async (req,res) => {
  const getSpecificAuthor = await AuthorModel.findOne(
    {books: req.params.isbn}
  );

  if(!getSpecificAuthor){
      return res.json({error: `Cannot get Book ${req.params.isbn}`});
  }
  return res.json({author: getSpecificAuthor});
});

/*************************************************************/

//to get all the publications
booky.get("/publications",async (req,res)=>{
  const getAllPublications = await PublicationModel.find();
  return res.json(getAllPublications);
})

//to get specific publication
/*booky.get("/publications/:name",(req,res)=>{
  const getSpecificPublication = database.publication.filter(
    (publications)=> publications.name.includes(req.params.name)
  );

  if(getSpecificPublication.length === 0){
    return res.json({error:`Cannot find the publication with name ${req.params.name}`});
  }
  return res.json({Publication:getSpecificPublication});
});*/

booky.get("/publications/:name",async (req,res)=>{
  const getSpecificPublication = await PublicationModel.findOne({name: req.params.name});

  if(!getSpecificPublication){
    return res.json({error:`Cannot find the publication with name ${req.params.name}`});
  }
  return res.json({Publication:getSpecificPublication});
});

//to get list of books based on book
/*booky.get("/publications/book/:isbn",(req,res)=>{
  const getSpecificPublication = database.publication.filter(
    (publications)=> publications.books.includes(req.params.isbn
  ));

  if(getSpecificPublication.length === 0){
    return res.json({error:`Cannot find publications book with ISBN ${req.params.isbn}`});
  }
  return res.json({publication:getSpecificPublication});
})*/

booky.get("/publications/book/:isbn",async (req,res)=>{
  const getSpecificPublication = await PublicationModel.findOne({books:req.params.isbn});

  if(!getSpecificPublication){
    return res.json({error:`Cannot find publications book with ISBN ${req.params.isbn}`});
  }
  return res.json({publication:getSpecificPublication});
});

/************************************************************/
// POST Requests

// inserting new book
booky.post("/book/new", async(req,res)=>{
  const { newBook } = req.body;
  const addNewBook = BookModel.create(newBook);
  return res.json({
    books:addNewBook,
    message:`Book is successfully added`
  });
});

//inserting new author
booky.post("/author/new",(req,res)=>{
  const { newAuthor } = req.body;
  const addNewAuthor = AuthorModel.create(newAuthor);
  return res.json({
    author:addNewAuthor,
    message:"Author is added"
  });
});

//inserting new publication
booky.post("/publication/new",(req,res)=>{
  const { newPublication } = req.body;
  const addNewPublication = PublicationModel.create(newPublication);
  return res.json({
    publication:addNewPublication,
    message:"Publication is added"
  });
});

/*************************************************************/
//PUT requests

//update or add new publication
/*booky.put("/publication/update/book/:isbn",(req,res)=>{
  //updating publication database
  database.publication.forEach((pub)=>{
    if(pub.id === req.body.pubId){
      return pub.books.push(req.params.isbn);
    }
  });

  //update the book database
  database.books.forEach((book)=>{
    if(book.ISBN === req.params.isbn) {
      book.publications = req.body.pubId;
      return;
    }
  });

  return res.json({
    books: database.books,
    publications: database.publication,
    message: "Successfully updated publications"
  });
});*/

//update book title
booky.put("/book/update/:isbn", async(req,res)=>{
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN:req.params.isbn
    },
    {
      title: req.body.bookTitle
    },
    {
      new:true
    }
  );
  return res.json({
    books:updatedBook
  });
});

//update author in author DB and book DB
booky.put("/book/author/update/:isbn", async(req,res) =>{
  //Update book database
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn
    },
    {
      $addToSet: {
        authors: req.body.newAuthor
      }
    },
    {
      new: true
    }
  );

  //Update the author database
  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: req.body.newAuthor
    },
    {
      $addToSet: {
        books: req.params.isbn
      }
    },
    {
      new: true
    }
  );

  return res.json(
    {
      books: updatedBook,
      authors: updatedAuthor,
      message: "New author was added"
    }
  );
});



/*******************************************************************/
//DELETE request

//Delete a book
/*booky.delete("/book/delete/:isbn",(req,res)=>{
  //whichever book that doesnot match with isbn. just send it to an updatedBook database array. and rest will be filtered out.
  const updatedBookDatabase = database.books.filter(
    (book) => book.ISBN !== req.params.isbn
  );
  database.books = updatedBookDatabase;

  return res.json({books: database.books});
});*/
booky.delete("/book/delete/:isbn", async (req,res) => {
  //Whichever book that doesnot match with the isbn , just send it to an updatedBookDatabase array
  //and rest will be filtered out

  const updatedBookDatabase = await BookModel.findOneAndDelete(
    {
      ISBN: req.params.isbn
    }
  );

  return res.json({
    books: updatedBookDatabase
  });
});

//Delete author from book
booky.delete("/author/delete/:id",(req,res)=>{
  const updatedAuthorDatabase = database.author.filter(
    (author) => author.id !== req.params.id
  );
  database.author = updatedAuthorDatabase;

  if(database.books.author === req.params.id){
    database.books.author=[];
  }
  return res.json({
    author: database.author,
    books:database.books
  });
});

//Delete author from book and related book from author
booky.delete("/book/delete/author/:isbn/:authorId",(req,res)=>{
    //update book database
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
          const newAuthorList = book.author.filter(
            (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
          );
          book.author = newAuthorList;
          return;
        }
      });

    //update the author database
    database.author.forEach((eachAuthor)=>{
      if(eachAuthor.id === parseInt(req.params.authorId)){
        const newBookList = eachAuthor.books.filter(
          (book)=> book !== req.params.isbn
        );
        eachAuthor.books = newBookList;
        return;
      }
    });

    return res.json({
      book: database.books,
      author: database.author,
      message:"Author is deleted successfully"
    })
});



//making or initializing our server i.e on localhost 4000 or cal use the available port to make our server.
booky.listen(4000,()=>{
  console.log("Server is up and running at 4000 port");
});

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL,
{
  useNewUrlParser:true,
  useUnifiedTopology: true
}).then(() => console.log("Connection Established"));
