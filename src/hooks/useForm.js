import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [form, setForm] = useState(initialState);

  const reset = (newFormState = initialState) => {
    setForm(newFormState);
  };

  const handleInputChange = ({ target }) =>
    setForm({ ...form, [target.name]: target.value });

  return [form, handleInputChange, reset];
};
