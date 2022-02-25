import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  login,
  logout,
  startLoginEmailPassword,
  startLogout,
} from "../../actions/auth";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let store = mockStore({});

describe("test auth - actions", () => {
  beforeEach(() => {
    store = mockStore({});
  });

  test("should create action with login and logout", () => {
    const loginAction = login("uid", "displayName");

    expect(loginAction).toEqual({
      type: types.login,
      payload: {
        uid: "uid",
        displayName: "displayName",
      },
    });

    const logoutAction = logout();

    expect(logoutAction).toEqual({
      type: types.logout,
    });
  });

  test("should work startLogout", async () => {
    await store.dispatch(startLogout());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.logout,
    });

    expect(actions[1]).toEqual({
      type: types.notesLogoutCleaning,
    });
  });

  test("should work startLoginEmailPassword", async () => {
    await store.dispatch(
      startLoginEmailPassword("carlosespejel@gmail.com", "12345678")
    );

    const actions = store.getActions();

    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: expect.any(String),
        displayName: expect.any(String),
      },
    });
  });
});
