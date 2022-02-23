import React, { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { activeNote, startDeletingNote } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);
  const [form, handleInputChange, reset] = useForm(note);
  const { body, title } = form;

  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(form.id, { ...form }));
  }, [form, dispatch]);

  const handleDelete = () => dispatch(startDeletingNote());

  return (
    <div className="notes__main-content animate__animated animate__fadeIn animate__faster">
      <NotesAppBar />
      <div className="notes__content">
        <input
          type="text"
          name="title"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          name="body"
          placeholder="What happened today?"
          className="notes__textarea"
          value={body}
          onChange={handleInputChange}
        ></textarea>
        {note.url && (
          <div className="notes__image">
            <img src={note.url} alt={note.url} />
          </div>
        )}
      </div>

      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
