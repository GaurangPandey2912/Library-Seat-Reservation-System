import React, { useState, useEffect } from "react";
import { db } from "../firebase"; 
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";

import "./BookIssue.css"; 
import Navbar from "../Components/navbar"; 

const BookIssue = () => {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);

  // Fetch books in real-time
  useEffect(() => {
    const booksRef = collection(db, "books");
    const unsubscribe = onSnapshot(booksRef, (snapshot) => {
      const bookList = snapshot.docs.map((doc) => ({
        id: doc.id, 
        ...doc.data(),
      }));
      setBooks(bookList);
    });

    return () => unsubscribe(); 
  }, []);

  // Handle book search
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Issue a book (reduce copies count)
  const issueBook = async (bookId, currentCopies) => {
    if (currentCopies > 0) {
      try {
        const bookRef = doc(db, "books", bookId);
        await updateDoc(bookRef, { copies: currentCopies - 1 });
      } catch (error) {
        console.error("Error issuing book:", error);
      }
    }
  };

  return (
    <div 
      style={{
        background: 'url("https://c4.wallpaperflare.com/wallpaper/728/926/542/library-ladders-candles-shelves-wallpaper-preview.jpg") no-repeat center center fixed',
        backgroundSize: "cover",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"             
      }}
    >
      <Navbar />
      <div className="header">
        <h1 className="title">Issue a Book</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>
      </div>
      <div className="book-list-grid">
        {books
          .filter((book) => (book.bookName ?? "").toLowerCase().includes(search.toLowerCase())) // ✅ FIXED ERROR
          .map((book) => (
            <div key={book.id} className="book-item">
  <h3>{book.bookName || book.title || "Unknown Title"}</h3>  {/* ✅ Fixed Title Handling */}
  <p>By {book.author || "Unknown Author"} ({book.year || "Unknown Year"})</p>
  <p className={book.copies > 0 ? "available" : "not-available"}>
    {book.copies > 0 ? `${book.copies} Copies Available` : "Out of Stock"}
  </p>
  <button
    className="place-hold-button"
    disabled={book.copies === 0}
    onClick={() => issueBook(book.id, book.copies)}
  >
    Issue
  </button>
</div>

          ))}
      </div>
    </div>
  );
};

export default BookIssue;
