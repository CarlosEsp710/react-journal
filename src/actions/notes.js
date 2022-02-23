import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";

import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const doc = await addDoc(
      collection(db, `${uid}`, "journal/notes"),
      newNote
    );

    dispatch(activeNote(doc.id, newNote));
    dispatch(addNewNote(doc.id, newNote));
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;

    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const activeNote = getState().notes.active;

    if (!activeNote.url) {
      delete activeNote.url;
    }

    const noteToFirestore = { ...activeNote };
    delete noteToFirestore.id;
    const noteRef = doc(db, `${uid}/journal/notes/${activeNote.id}`);

    await updateDoc(noteRef, noteToFirestore);

    dispatch(refreshNote(activeNote.id, noteToFirestore));

    Swal.fire("Saved", "Your note has been saved", "success");
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const activeNote = getState().notes.active;

    Swal.fire({
      title: "Please Wait!",
      html: "Data uploading...",
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    const fileUrl = await fileUpload(file);
    activeNote.url = fileUrl;

    Swal.close();

    dispatch(startSaveNote(activeNote));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const activeNote = getState().notes.active;

    const noteRef = doc(db, `${uid}/journal/notes/${activeNote.id}`);
    await deleteDoc(noteRef);

    dispatch(deleteNote(activeNote.id));
  };
};

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
});

export const logoutCleaning = () => ({
  type: types.notesLogoutCleaning,
});
