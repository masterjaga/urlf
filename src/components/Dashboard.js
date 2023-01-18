import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../App";
import axios from "axios";
import Nav from "./Nav";
function Dashboard() {
  let navigate = useNavigate();
  const [Data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      let request = await axios.get(`${url}/Dashboard`, {
        headers: {
          authorization: window.localStorage.getItem("app-token"),
        },
      });
      setData(request.data.result);

      if (request.data.statusCode === 400) {
        window.alert(request.data.message);
        navigate(`/instagram/user/accounts/my_accounts/email/login`);
      }
      if (request.status === 500) {
        console.log(request.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Nav />
      <div className="container">
        <div className="row">
          {Data &&
            Data.map((element, index) => {
              return (
                <>
                  <div
                    className="card text-bg-light mb-3"
                    style={{ maxWidth: "18rem" }}
                  >
                    <div className="card-header">
                      Total Clicks : {element.clickCount}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        <a
                          href={`https://url-shortener-web-apps.netlify.app/${element.shortUrl}`}
                          className="card-title"
                          target="_blank"
                          rel="noreferrer"
                        >{`https://url-shortener-web-apps.netlify.app/${element.shortUrl}`}</a>
                      </h5>
                      <p className="card-text">{`https://url-shortener-web-apps.netlify.app${element.loginUrl}`}</p>
                    </div>
                  </div>
                  <br />
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
