import React, { useState } from "react";
import axios from "axios";

const useHttp = (props) => {
  const { url, method, data } = props;
  const [error, setError] = useState();

  const doRequest = async () => {
    try {
      setError("");

      const res = await axios[method](url, {
        data,
      });
      return res.data;
    } catch (error) {
      setError("Error");
      return;
    }
  };

  return [error, doRequest];
};

export default useHttp;
