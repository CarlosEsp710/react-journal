import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { LoginScreen } from "../../../components/auth/LoginScreen";
import { MemoryRouter } from "react-router-dom";
import {
  startGoogleLogin,
  startLoginEmailPassword,
} from "../../../actions/auth";

jest.mock("../../../actions/auth", () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmailPassword: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
);

describe("test <LoginScreen />", () => {
  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllMocks();
  });

  test("should return <LoginScreen /> component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should call startGoogleLogin", () => {
    wrapper.find(".google-btn").simulate("click");

    expect(startGoogleLogin).toHaveBeenCalled();
  });

  test("should call startLoginEmailPassword", () => {
    wrapper.find("form").simulate("submit");

    expect(startLoginEmailPassword).toHaveBeenCalled();
    expect(startLoginEmailPassword).toHaveBeenCalledWith(
      "carlosespejel@gmail.com",
      "12345678"
    );
  });
});
