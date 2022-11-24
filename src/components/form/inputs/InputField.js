import React, { useState, useEffect } from "react";
import { ErrorMessage, Field } from "formik";
import { TextField } from "@mui/material";

import { useDispatch } from "react-redux";
import { changeName } from "../../../redux/slice/companyNameSlice";

export default function InputField({ name, label, type }) {
  const [nameCompany, setNameCompany] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeName(nameCompany));
  }, [nameCompany]);

  return (
    <Field
      required
      autoComplete="off"
      name={name}
      label={label}
      type={type}
      as={TextField}
      onChange={(e) => setNameCompany(e.target.value)}
      helperText={<ErrorMessage name={name} />}
    />
  );
}
