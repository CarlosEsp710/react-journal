import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe("test authReducer", () => {
  test("should change user state with login", () => {
    const initialState = {};

    const action = {
      type: types.login,
      payload: {
        uid: "abc",
        displayName: "John Doe",
      },
    };

    const state = authReducer(initialState, action);

    expect(state).toEqual({
      uid: "abc",
      name: "John Doe",
    });
  });

  test("should remove user state with logout", () => {
    const initialState = {
      uid: "abc",
      displayName: "John Doe",
    };

    const action = {
      type: types.logout,
    };

    const state = authReducer(initialState, action);

    expect(state).toEqual({});
  });
});
