import { types } from "../../types/types";

describe("test types", () => {
  const typesTest = {
    login: "[Auth] Login",
    logout: "[Auth] Logout",

    notesAddNew: "[Notes] New note",
    notesActive: "[Notes] Active note",
    notesLoad: "[Notes] Load note",
    notesUpdated: "[Notes] Updated note",
    notesFileUrl: "[Notes] Updated image url",
    notesDelete: "[Notes] Delete note",
    notesLogoutCleaning: "[Notes] Logout cleaning",

    uiSetError: "[UI] Set Error",
    uiRemoveError: "[UI] Remove Error",
    uiStartLoading: "[UI] Start Loading",
    uiFinishLoading: "[UI] Finish Loading",
  };

  test("should be equal", () => {
    expect(types).toEqual(typesTest);
  });
});
