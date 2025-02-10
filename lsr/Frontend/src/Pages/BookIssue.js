import React, { useState } from "react";
import "./BookIssue.css";
import Navbar from "../Components/navbar";

const LibraryCatalogue = () => {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);

  const handleSearchChange = async (e) => {
    setSearch(e.target.value);
    
    // Simulate fetching data from a database
    const fetchedBooks = [
      { title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, available: true },
      { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, available: false },
      { title: "1984", author: "George Orwell", year: 1949, available: true },
      { title: "Pride and Prejudice", author: "Jane Austen", year: 1813, available: false }
    ];
    
    setBooks(fetchedBooks.filter(book => book.title.toLowerCase().includes(e.target.value.toLowerCase())));
  };

  return (
    <div
      style={{
        background: `url("https://c4.wallpaperflare.com/wallpaper/728/926/542/library-ladders-candles-shelves-wallpaper-preview.jpg") no-repeat center center fixed`,
        backgroundSize: "cover",
        minHeight: "100vh", // Ensures it covers the full screen
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
        <h1 className="title">Library Catalogue</h1>
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
        {books.map((book, index) => (
          <div key={index} className="book-item">
            <h3>{book.title}</h3>
            <p>By {book.author} ({book.year})</p>
            <p className={book.available ? "available" : "not-available"}>
              {book.available ? "Available" : "No Copies Available"}
            </p>
            <button className="place-hold-button" disabled={!book.available}>Issue</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryCatalogue;
