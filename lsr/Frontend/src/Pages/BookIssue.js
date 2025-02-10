import React, { useState } from "react";
import "./BookIssue.css";

const BookIssue = () => {
  const [books, setBooks] = useState([]);
  const [bookTitle, setBookTitle] = useState("");
  const [borrowerName, setBorrowerName] = useState("");
  const [issueDate, setIssueDate] = useState("");

  const handleIssueBook = () => {
    if (bookTitle && borrowerName && issueDate) {
      setBooks([...books, { bookTitle, borrowerName, issueDate }]);
      setBookTitle("");
      setBorrowerName("");
      setIssueDate("");
    }
  };

  return (
    <div className="container">
      <h2>Book Issue System</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Book Title"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Borrower Name"
          value={borrowerName}
          onChange={(e) => setBorrowerName(e.target.value)}
        />
        <input
          type="date"
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
        />
        <button onClick={handleIssueBook}>Issue Book</button>
      </div>
      <div className="issued-books">
        <h3>Issued Books</h3>
        <ul>
          {books.map((book, index) => (
            <li key={index}>
              {book.bookTitle} - {book.borrowerName} (Issued on: {book.issueDate})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookIssue;
