import React from "react";
import Button from "./Button";
export default function Card({ book, isBookInBookShelf, handleAddToShelf }) {
  return (
    <div className="card">
      <h3>Book title : {book.title}</h3>
      <h3>Edition Count : {book.edition_count}</h3>
      {!isBookInBookShelf(book) && (
        <Button onClick={() => handleAddToShelf(book)}>Add to Bookshelf</Button>
      )}
    </div>
  );
}
