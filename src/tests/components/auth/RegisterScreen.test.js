import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { RegisterScreen } from "../../../components/auth/RegisterScreen";
import { MemoryRouter } from "react-router-dom";
import { types } from "../../../types/types";
// import {
//   startGoogleLogin,
//   startLoginEmailPassword,
// } from "../../../actions/auth";

// jest.mock("../../../actions/auth", () => ({
//   startGoogleLogin: jest.fn(),
//   startLoginEmailPassword: jest.fn(),
// }));

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
//store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
);

describe("test <RegisterScreen />", () => {
  beforeEach(() => {
    //store = mockStore(initialState);
    jest.clearAllMocks();
  });

  test("should return <RegisterScreen /> component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should dispatch of handleInputChange", () => {
    const emailInput = wrapper.find('input[name="email"]');
    emailInput.simulate("change", {
      target: {
        name: "email",
        value: "",
      },
    });

    wrapper.find("form").simulate("submit", {
      preventDefault: () => {},
    });

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.uiSetError,
      payload: "Email is invalid",
    });
  });

  test("should return alert box with error", () => {
    const initialState = {
      auth: {},
      ui: {
        loading: false,
        msgError: "Email is invalid",
      },
    };

    let store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find(".auth__alert-error").exists()).toBe(true);
    expect(wrapper.find(".auth__alert-error").text()).toBe("Email is invalid");
  });
});
