import React from "react";

const InputComponent = (props) => {
  const { value, setValue, label, type = "text" } = props;

  return (
    <div style={{ width: "100%" }}>
      <label> {label} </label>
      <input
        style={{ width: "100%", height: "30px", margin: "10px 0" }}
        value={value}
        type={type}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default InputComponent;
