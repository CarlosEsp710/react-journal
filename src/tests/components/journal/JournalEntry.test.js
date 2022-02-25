import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { JournalEntry } from "../../../components/journal/JournalEntry";
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
    active: null,
    notes: [],
  },
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

const note = {
  id: "123",
  title: "Test note",
  body: "This is a test note",
};

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <JournalEntry id="123" {...note} />
    </MemoryRouter>
  </Provider>
);
describe("test <JournalEntry />", () => {
  test("should return <JournalEntry /> component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should call activeNote", () => {
    wrapper.find(".journal__entry").at(0).simulate("click");
    expect(activeNote).toHaveBeenCalled();
  });
});
