import "./App.css";
import { useEffect, useState } from "react";
import Button from "./Button";
// import MyShelf from "./MyShelf";
// import Books from "./Books";
import Card from "./Card";
function App() {
  const [initialBooks, setInitialBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [showbooks, setShowBooks] = useState(true);
  const [myShelf, setMyShelf] = useState([]);
  const [showMyshelf, setShowMyShelf] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  useEffect(function () {
    const fetchInitialBooks = async function () {
      try {
        setIsInitialLoading(true);
        const res = await fetch(
          `https://openlibrary.org/search.json?q=harry&limit=10&page=1`
        );
        console.log("fetching...");
        const data = await res.json();
        console.log(data.docs);
        setInitialBooks(data.docs);
      } catch (error) {
        console.log(error);
      } finally {
        setIsInitialLoading(false);
      }
    };
    fetchInitialBooks();
  }, []);
  useEffect(
    function () {
      if (query.length < 3) {
        return;
      }
      const fetchBooks = async function () {
        try {
          setIsSearchLoading(true);
          const res = await fetch(
            `https://openlibrary.org/search.json?q=${query}&limit=10&page=1`
          );
          const data = await res.json();
          setBooks(data.docs);
          console.log(data.docs);
        } catch (error) {
          console.log(error);
        } finally {
          setIsSearchLoading(false);
        }
      };
      const delayRequest = setTimeout(() => {
        return fetchBooks();
      }, 300);
      return () => clearTimeout(delayRequest);
    },
    [query]
  );
  useEffect(function () {
    const books = localStorage.getItem("mybookshelf");
    console.log("restoring from local storage");
    console.log(JSON.parse(books));
    const parsedBooks = JSON.parse(books);
    setMyShelf(Array.isArray(parsedBooks) ? parsedBooks : []);
    setIsLoading((t) => !t);
  }, []);
  useEffect(
    function () {
      console.log("changed");
      if (!isLoading) {
        localStorage.setItem("mybookshelf", JSON.stringify(myShelf));
        console.log("Added to local storage");
      }
    },
    [myShelf, isLoading]
  );
  function handleMyBookShelf() {
    setShowMyShelf((s) => !s);

    setShowBooks((s) => !s);
  }
  function handleAddToShelf(book) {
    if (!myShelf.some((b) => b.key === book.key)) {
      setMyShelf([...myShelf, book]);
    }
  }
  function isBookInBookShelf(book) {
    return myShelf && myShelf.some((b) => b.key === book.key);
  }
  return (
    <div className="App">
      {showbooks && (
        <>
          <h3 className="h-heading">Search by bookname :</h3>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </>
      )}

      <div className="button-container">
        {showbooks && myShelf.length > 0 && (
          <Button onClick={handleMyBookShelf}>My Bookshelf</Button>
        )}
        {showMyshelf && <Button onClick={handleMyBookShelf}>Back</Button>}
      </div>

      {isInitialLoading ? (
        <div className="loader"></div>
      ) : (
        showbooks &&
        query.length < 3 && (
          <div className="grid-container">
            {initialBooks.map((book) => (
              <Card
                key={book.key}
                book={book}
                handleAddToShelf={handleAddToShelf}
                isBookInBookShelf={isBookInBookShelf}
              />
            ))}
          </div>
        )
      )}
      {isSearchLoading ? (
        <div className="loader"></div>
      ) : (
        showbooks &&
        query.length >= 3 && (
          <div className="grid-container ">
            {books.map((book) => (
              <Card
                key={book.key}
                book={book}
                handleAddToShelf={handleAddToShelf}
                isBookInBookShelf={isBookInBookShelf}
              />
            ))}
          </div>
        )
      )}
      {showMyshelf && (
        <div className="grid-container">
          {myShelf.map((book) => (
            <Card
              key={book.key}
              book={book}
              handleAddToShelf={handleAddToShelf}
              isBookInBookShelf={() => true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
