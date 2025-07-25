import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";

// Fetch students
export async function getStudents() {
  const snapshot = await getDocs(collection(db, "students"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Add a student
export async function addStudent(data: { name: string; year: string; email: string }) {
  await addDoc(collection(db, "students"), data);
}
