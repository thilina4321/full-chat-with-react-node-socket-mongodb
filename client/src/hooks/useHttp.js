import React, { useState } from "react";
import axios from "axios";

const useHttp = (props) => {
  const { url, method, data } = props;

  const doRequest = async () => {
    try {

      const res = await axios[method](url, {
        data,
      });
      return { data: res.data };
    } catch (error) {
      return { error: true };
    }
  };

  return doRequest;
};

export default useHttp;
