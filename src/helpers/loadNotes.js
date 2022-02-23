import { collection, getDocs, query } from "firebase/firestore";

import { db } from "../firebase/firebase-config";

export const loadNotes = async (uid) => {
  const notesDB = await getDocs(query(collection(db, `${uid}/journal/notes`)));

  const notes = [];

  notesDB.forEach((note) => {
    notes.push({
      id: note.id,
      ...note.data(),
    });
  });

  return notes;
};
