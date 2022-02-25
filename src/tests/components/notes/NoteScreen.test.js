import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { NoteScreen } from "../../../components/notes/NoteScreen";
import { activeNote } from "../../../actions/notes";

jest.mock("../../../actions/notes", () => ({
  activeNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  auth: {
    uid: "123",
    name: "John Doe",
  },
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: {
      id: "123",
      title: "",
      body: "",
    },
    notes: [],
  },
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <NoteScreen />
    </MemoryRouter>
  </Provider>
);
describe("test <NoteScreen />", () => {
  test("should return <NoteScreen /> component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should call activeNote", () => {
    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "Hola mundo",
      },
    });

    expect(activeNote).toHaveBeenCalled();
    expect(activeNote).toHaveBeenLastCalledWith("123", {
      id: "123",
      title: "Hola mundo",
      body: "",
    });
  });
});
