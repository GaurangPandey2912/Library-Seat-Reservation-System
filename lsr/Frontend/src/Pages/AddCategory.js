import React, { useState } from "react";
import { db } from "../firebase"; // Ensure Firebase is initialized
import { collection, addDoc } from "firebase/firestore";
import Input from "../Components/ui/input";
import Navbar from "../Components/adminNavbar";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");

  const handleAddCategory = async () => {
    if (!categoryName) {
      alert("Please enter a category name");
      return;
    }

    const categoryCollection = collection(db, "categories");

    try {
      const docRef = await addDoc(categoryCollection, {
        name: categoryName,
        timestamp: new Date(),
      });

      console.log("Category added successfully with ID:", docRef.id);
      alert("Category added successfully!");

      setCategoryName("");
    } catch (error) {
      console.error("Error adding category:", error);
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
          Add a Category
        </h2>
        <div style={{ marginBottom: "15px" }}>
          <Input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
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
        <button
          onClick={handleAddCategory}
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
          Add Category
        </button>
      </div>
    </div>
  );
};

export default AddCategory;
