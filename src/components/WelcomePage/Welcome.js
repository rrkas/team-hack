import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Welcome.css";
import { useHistory } from "react-router-dom";
const Welcome = () => {
  const history = useHistory();
  const [name, setName] = React.useState("");
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("name");
    setName(myParam);
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    history.push("/Compiler");
  }

  return (
      <div>
        <Navbar />
        <div className="form welcome">
          <div className="form-group">
          <h1>ROOM DETAILS</h1>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="ENTER ROOM NO."
            ></input>
            <button>CREATE ROOM</button>
          </div>
          <div class="or form-group">
            <hr class="bar" />
            <span>OR</span>
            <hr class="bar" />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="ENTER INVITE CODE"  
            ></input>
            <button>JOIN ROOM</button>
          </div>
        </div>
      </div>

    
  );
};
export default Welcome;
