import React, { useState } from "react";
import { db } from "../firebase"; // Ensure Firebase is initialized
import { collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import Input from "../Components/ui/input"; // Assuming you want to keep Input
import Navbar from "../Components/adminNavbar";

const AddBook = () => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [copies, setCopies] = useState("");
  const [category, setCategory] = useState("");

  const handleAddBook = async () => {
    if (!bookName || !author || !copies || !category) {
      alert("Please fill in all fields");
      return;
    }

    const bookCollection = collection(db, "books");
    const copiesArray = [];
    for (let i = 0; i < parseInt(copies, 10); i++) {
      copiesArray.push({ id: uuidv4(), available: true });
    }

    try {
      const docRef = await addDoc(bookCollection, {
        bookName,
        title: bookName,
        author,
        category,
        copies: copiesArray,
        timestamp: new Date(),
      });

      console.log("Book added successfully with ID:", docRef.id);
      alert("Book added successfully!");

      setBookName("");
      setAuthor("");
      setCopies("");
      setCategory("");
    } catch (error) {
      console.error("Error adding book:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Navbar />
      <div
        style={{
          padding: "20px",
          maxWidth: "400px",
          width: "100%",
          marginTop: "20px",
          border: "1px solid gray",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#333",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Add a Book
        </h2>
        <div style={{ marginBottom: "15px" }}>
          <Input
            type="text"
            placeholder="Book Name"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: "#444",
              color: "white",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <Input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: "#444",
              color: "white",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <Input
            type="number"
            placeholder="Number of Copies"
            value={copies}
            onChange={(e) => setCopies(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: "#444",
              color: "white",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: "#444",
              color: "white",
            }}
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="English Literature">English Literature</option>
            <option value="Quantum Mechanics">Quantum Mechanics</option>
            <option value="Calculus">Calculus</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Mythology">Mythology</option>
          </select>
        </div>
        <button
          onClick={handleAddBook}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "teal",
            color: "white",
            fontWeight: "bold",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;
