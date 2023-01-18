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
      window.open(`${request.data.Url}`, "_blank");
    }
    if (request.data.statusCode === 401) {
      window.alert(request.data.message);
      navigate("/email/signup");
    }
  }

  return <></>;
}

export default Active;
