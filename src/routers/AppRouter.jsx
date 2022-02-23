import React, { useEffect, useState } from "react";

import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { login } from "../actions/auth";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { startLoadingNotes } from "../actions/notes";

export const AppRouter = () => {
  const auth = getAuth();
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user?.uid) {
        setIsLoggedIn(true);
        dispatch(login(user.uid, user.displayName));
        dispatch(startLoadingNotes());
      } else {
        setIsLoggedIn(false);
      }

      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return <h1>Please, wait...</h1>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route
          path="/auth/*"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <AuthRouter />
            </PublicRoute>
          }
        />
        {/* Private routes */}
        <Route
          path="/"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <JournalScreen />
            </PrivateRoute>
          }
        />
        {/* Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
