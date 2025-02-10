import { db, collection, addDoc } from "./firebase.js";

const fetchBooks = async () => {
  try {
    console.log("Fetching books...");
    
    // Fetch 100+ books from Open Library API (you can change the query)
    const response = await fetch("https://openlibrary.org/search.json?q=fiction&limit=100");
    const data = await response.json();

    const books = data.docs.map((book) => ({
      title: book.title,
      author: book.author_name ? book.author_name[0] : "Unknown",
      year: book.first_publish_year || "N/A",
      copies: Math.floor(Math.random() * 10) + 1  // Random availability between 1-10
    }));

    const booksRef = collection(db, "books");

    // Add books one by one
    for (const book of books) {
      await addDoc(booksRef, book);
      console.log(`Added: ${book.title}`);
    }

    console.log("✅ 100+ books added successfully to Firestore!");
  } catch (error) {
    console.error("❌ Error adding books:", error);
  }
};

fetchBooks();
