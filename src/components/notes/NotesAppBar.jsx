import React from "react";

import { useDispatch } from "react-redux";

import { startSaveNote, startUploading } from "../../actions/notes";

export const NotesAppBar = () => {
  const dispatch = useDispatch();

  const handleSave = () => dispatch(startSaveNote());

  const handlePicture = () => {
    document.querySelector("#fileSelector").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      dispatch(startUploading(file));
    }
  };

  return (
    <div className="notes__app-bar">
      <span>28 de agosto del 2021</span>

      <input
        id="fileSelector"
        type="file"
        name="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div>
        <button onClick={handlePicture} className="btn cursor">
          Picture
        </button>
        <button onClick={handleSave} className="btn cursor">
          Save
        </button>
      </div>
    </div>
  );
};
