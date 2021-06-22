// modules required for routing
import express from "express";
const router = express.Router();
export default router;

// define the book model
import book from "../Models/books";

/* GET books List page. READ */
router.get("/", (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("books/index", {
        title: "Books",
        page: "books",
        books: books,
      });
    }
  });
});

// GET books from list
router.get("/books", (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("books/index", {
        title: "Books",
        page: "books",
        books: books,
      });
    }
  });
});

//  GET the Book Details page in order to add a new Book
router.get("/add", (req, res, next) => {
  res.render("books/details", {
    title: "Add",
    page: "add",
    books: "",
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post("/add", (req, res, next) => {
  //create a new book document using the req body
  let newBook = new book({
    Title: req.body.title,
    Description: req.body.description,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre,
  });

  //use mongoose to create a a new book in the database then redirect user
  book.create(newBook, (err, book) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.redirect("/books");
    }
  });
});

// GET the Book Details page in order to edit an existing Book
router.get("/edit/:id", (req, res, next) => {
  //get the id property off the request objects parameters
  let id = req.params.id;

  //use the id requested and Mongoose books model to look for a match in the db and outpot it to the page
  book.findById(id, {}, {}, (err, book) => {
    if (err) {
      console.error({ err: err, id: id });
      res.end(err);
    } else {
      res.render("books/details", {
        title: "Edit",
        page: "edit",
        books: book,
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/edit/:id", (req, res, next) => {
  //get the id property off the request objects parameters
  let id = req.params.id;

  //create a new book document with the values from the form fields
  let updatedBook = new book({
    _id: id,
    Title: req.body.title,
    Description: req.body.description,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre,
  });

  //use the id requested and Mongoose books model to look for a match in the db and update it
  book.updateOne({ _id: id }, updatedBook, {}, (err) => {
    if (err) {
      //if theres an error, log and end the request
      console.error(err);
      res.end(err);
    }
    //redirect to books page
    res.redirect("/books");
  });
});

// GET - process the delete by user id
router.get("/delete/:id", (req, res, next) => {
  //get the id property off the request objects parameters
  let id = req.params.id;
  //use the id requested and the Mongoose books model to look for a match in the db and remove it
  book.remove({ _id: id }, (err) => {
    if (err) {
      //if theres an error, log and respond with an error
      console.error(err);
      res.end(err);
    }
    //redirect to books page
    res.redirect("/books");
  });
});

//module.exports = router;
