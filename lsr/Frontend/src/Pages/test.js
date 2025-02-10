import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const TestFirestore = () => {
  const testAdd = async () => {
    try {
      const docRef = await addDoc(collection(db, "testCollection"), {
        message: "Testing Firestore",
        timestamp: new Date(),
      });
      console.log("Test document added with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding test document:", error);
    }
  };

  return (
    <div>
      <button onClick={testAdd} className="p-2 bg-green-500 text-white">
        Test Firestore
      </button>
    </div>
  );
};

export default TestFirestore;
