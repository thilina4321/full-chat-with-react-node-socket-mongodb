import React from "react";

const CustomPrompt = (props) => {
  const { when, setValue } = props;

//   const promot = () => {
//     if (when) { 
//       confirm("press a button");
//     }
//   };
  return <div>{when && 'promot'}</div>;
};

export default CustomPrompt;
