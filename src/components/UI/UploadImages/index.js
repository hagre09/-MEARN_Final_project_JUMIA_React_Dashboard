import React from "react";
import { useField } from "formik";

const UploadImages = ({ name, label,setFiles, ...rest }) => {
  const [field, meta] = useField(name);
  const error = meta.touched && meta.error;
  
  
  return (
    <div class="mb-3">
      <label for="formFileMultiple" class="form-label">
        {label}
      </label>
      <input
        class="form-control"
        type="file"
        id="formFileMultiple"
        {...rest}
        {...field}
        accept="image/*"
        multiple
        onChange={(e) => setFiles(e.target.files)}
      />
      {!!error && <div class="invalid-feedback">{error}</div>}
    </div>
  );
};

export default UploadImages;
