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
router.get("/details", (req, res, next) => {
  res.render("books/details", {
    title: "Add",
    page: "add",
    books: "",
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post("/details", (req, res, next) => {
  //create a new book document
  let newBook = new book({
    Title: req.body.title,
    Description: req.body.description,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre,
  });

  //use mongoose to create in the database then redirect user
  book.create(newBook, (err, book) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.redirect("/books");
    }
  });
  /*****************
   * ADD CODE HERE *
   *****************/
});

// GET the Book Details page in order to edit an existing Book
router.get("/edit/:id", (req, res, next) => {
  let id = req.params.id;

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

  /*****************
   * ADD CODE HERE *
   *****************/
});

// POST - process the information passed from the details form and update the document
router.post("/edit/:id", (req, res, next) => {
  //get the id property off the request objects parameters
  let id = req.params.id;

  let updatedBook = new book({
    _id: id,
    Title: req.body.title,
    Description: req.body.description,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre,
  });

  //use the id requested and Mongoose Contact model to look for a match in the db
  //pass the id, empty objects for unused parameters and a callback funcion
  book.updateOne({ _id: id }, updatedBook, {}, (err) => {
    if (err) {
      //if theres an error, log and end the request
      console.error(err);
      res.end(err);
    }
    res.redirect("/books");
  });

  /*****************
   * ADD CODE HERE *
   *****************/
});

// GET - process the delete by user id
router.get("/delete/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
});

//module.exports = router;
