import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router-dom";
import { login } from "../../actions/auth";
import { AppRouter } from "../../routers/AppRouter";
import { act } from "react-dom/test-utils";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

jest.mock("../../actions/auth", () => ({
  login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: "abc",
    notes: [],
  },
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

describe("test <AppRouter />", () => {
  test("should call login if there a authenticated user", async () => {
    let user;

    await act(async () => {
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        "carlosespejel@gmail.com",
        "12345678"
      );

      user = userCredentials.user;

      const wrapper = mount(
        <Provider store={store}>
          <AppRouter />
        </Provider>
      );
    });

    expect(login).toHaveBeenCalled();
    expect(login).toHaveBeenCalledWith(user.uid, user.displayName);
  });
});
