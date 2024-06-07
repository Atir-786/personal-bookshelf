import React from "react";
import Button from "./Button";
export default function Books({ books, myShelf, handleAddToShelf }) {
  function isBookInBookShelf(book) {
    return myShelf && myShelf.some((b) => b.key === book.key);
  }
  return (
    <div>
      {books.map((book) => (
        <div key={book.key}>
          <h3>Book title : {book.title}</h3>
          <h3>Edition Count : {book.edition_count}</h3>
          {!isBookInBookShelf(book) && (
            <Button onClick={() => handleAddToShelf(book)}>
              Add to Bookshelf
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
