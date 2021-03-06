import {
  finishLoading,
  removeError,
  setError,
  startLoading,
} from "../../actions/ui";
import { types } from "../../types/types";

describe("test ui - action", () => {
  test("all actions should work", () => {
    const error = "error";

    const setErrorAction = setError(error);

    expect(setErrorAction).toEqual({
      type: types.uiSetError,
      payload: error,
    });

    const removeErrorAction = removeError();

    expect(removeErrorAction).toEqual({
      type: types.uiRemoveError,
    });

    const startLoadingAction = startLoading();

    expect(startLoadingAction).toEqual({
      type: types.uiStartLoading,
    });

    const finishLoadingAction = finishLoading();

    expect(finishLoadingAction).toEqual({
      type: types.uiFinishLoading,
    });
  });
});
