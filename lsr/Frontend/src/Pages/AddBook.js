import React, { useState } from "react";
import { db } from "../firebase"; // Ensure Firebase is initialized
import { collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import Input from "../Components/ui/input"; // Assuming you want to keep Input

const AddBook = () => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [copies, setCopies] = useState("");

  const handleAddBook = async () => {
    if (!bookName || !author || !copies) {
      alert("Please fill in all fields");
      return;
    }

    const bookCollection = collection(db, "books");
    const copiesArray = [];
    for (let i = 0; i < parseInt(copies, 10); i++) {
      copiesArray.push({ id: uuidv4(), available: true });
    }

    try {
      await addDoc(bookCollection, {
        bookName,
        author,
        copies: copiesArray,
        timestamp: new Date(),
      });
      alert("Book added successfully!");
      setBookName("");
      setAuthor("");
      setCopies("");
    } catch (error) {
      console.error("Error adding book: ", error);
      alert("Error adding book");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10 border border-gray-300 rounded-lg shadow-md">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Add a Book</h2>
        <Input
          type="text"
          placeholder="Book Name"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          className="mb-2 w-full p-2 border rounded"
        />
        <Input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="mb-2 w-full p-2 border rounded"
        />
        <Input
          type="number"
          placeholder="Number of Copies"
          value={copies}
          onChange={(e) => setCopies(e.target.value)}
          className="mb-2 w-full p-2 border rounded"
        />
        <button
          onClick={handleAddBook}
          className="w-full bg-blue-500 text-white py-2 rounded mt-2 hover:bg-blue-600"
        >
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;
