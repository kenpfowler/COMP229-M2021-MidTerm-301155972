//File name: app.ts
//Author's name: Ken Fowler
//StudentID: 301155972
//Web App name: MidTerm

//IIFE -- Immediately Invoked Function Expression
"use strict";
(function () {
  //alerts user before they delete a book from the collection
  function confirmDelete() {
    // confirm deletion
    $("a.delete").on("click", function (event) {
      if (!confirm("Are you sure?")) {
        event.preventDefault();
        location.href = "/books";
      }
    });
  }
  //calls functions
  function Start(): void {
    console.log("App Started");

    confirmDelete();
  }

  window.addEventListener("load", Start);
})();
