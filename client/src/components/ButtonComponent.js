import React from "react";

const ButtonComponent = (props) => {
  const { name, clickHandler } = props;
  return (
    <div style={{ width: "100%", cursor: "pointer" }}>
      <button
        style={{
          width: "100%",
          height: "50px",
          backgroundColor: "purple",
          color: "white",
          cursor:'pointer'
        }}
        onClick={clickHandler}
      >
        {" "}
        {name}{" "}
      </button>
    </div>
  );
};

export default ButtonComponent;
