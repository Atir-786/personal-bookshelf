import React from "react";

export default function MyShelf({ myShelf }) {
  return (
    <div>
      {myShelf.map((book) => (
        <div key={book.key}>
          <h3>Book title : {book.title}</h3>
          <h3>Edition Count : {book.edition_count}</h3>
        </div>
      ))}
    </div>
  );
}
