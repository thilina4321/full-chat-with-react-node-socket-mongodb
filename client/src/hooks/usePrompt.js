import React, { useEffect, useState } from "react";

const usePrompt = () => {
  const [when, setWhen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (when) {
      const val = window.confirm("Are you sure?");
      setWhen(false)
      setValue(val)
    }
  }, [when]);
  return [value, () => setWhen(true)];
};

export default usePrompt;
