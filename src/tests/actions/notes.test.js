/** * @jest-environment node */

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startDeletingNote,
  startLoadingNotes,
  startNewNote,
  startUploading,
} from "../../actions/notes";
import { fileUpload } from "../../helpers/fileUpload";
import { types } from "../../types/types";

jest.mock("../../helpers/fileUpload", () => ({
  fileUpload: jest.fn(() => {
    return Promise.resolve("https://source.unsplash.com/random/400x400");
  }),
}));

global.scrollTo = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  auth: {
    uid: "test-uid-123",
  },
  notes: {
    active: {
      id: "z83ZqLL9Z4yKj0HyIBAm",
    },
    notes: [],
  },
};

let store = mockStore(initialState);

describe("test notes - actions", () => {
  beforeEach(() => {
    store.clearActions();
    store = mockStore(initialState);
  });

  test("should create new note", async () => {
    await store.dispatch(startNewNote());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });
  });

  test("should load notes", async () => {
    await store.dispatch(startLoadingNotes());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array),
    });
  });

  // test("should upload file", async () => {
  //   const file = [];

  //   await store.dispatch(startUploading(file));

  //   const actions = store.getActions();

  //   console.log(actions);
  // });
});
