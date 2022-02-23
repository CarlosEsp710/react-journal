import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";

import { startRegisterEmailPasswordName } from "../../actions/auth";
import { removeError, setError } from "../../actions/ui";

import { useForm } from "../../hooks/useForm";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const [form, handleInputChange] = useForm({
    name: "Carlos Espejel Salazar",
    email: "carlosespejel@gmail.com",
    password: "12345678",
    confirm_password: "12345678",
  });

  const { name, email, password, confirm_password } = form;

  const handleRegister = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      dispatch(startRegisterEmailPasswordName(email, password, name));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("Name is required"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email is invalid"));
      return false;
    } else if (password !== confirm_password || password.length < 6) {
      dispatch(setError("Password should be at least 6 characters and match"));
      return false;
    }

    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form
        onSubmit={handleRegister}
        className="animate__animated animate__fadeIn animate__faster"
      >
        {msgError && <div className="auth__alert-error">{msgError}</div>}

        <input
          className="auth__input"
          type="text"
          placeholder="Name"
          name="name"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Confirm password"
          name="confirm_password"
          value={confirm_password}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary btn-block mb-5" type="submit">
          Register
        </button>
        <Link className="link mt-5" to="/auth/login">
          Already registered? Sign in now!
        </Link>
      </form>
    </>
  );
};
