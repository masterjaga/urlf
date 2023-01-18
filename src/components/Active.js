import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../App";

function Active() {
  let params = useParams();
  let navigate = useNavigate();
  useState(() => {
    getResult();
  }, []);
  async function getResult() {
    let request = await axios.get(`${url}/${params.id}`);

    if (request.data.statusCode === 202) {
      navigate(`${request.data.Url}`);
    }
    if (request.data.statusCode === 401) {
      window.alert(request.data.message);
      navigate("/signup");
    }
  }

  return <></>;
}

export default Active;
