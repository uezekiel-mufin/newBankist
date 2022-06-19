import React from "react";
import "./firstpage.css";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const FirstPage = ({ modal, setModal }) => {
  return (
    <div className='modal__container'>
      <div className='modal'>
        <div className='modal__head'>
          <AiOutlineClose
            onClick={() => setModal(false)}
            style={{ fontSize: "3rem", fontWeight: 700, color: "blue" }}
          />
        </div>
        <div className='modal__body'>
          <span className='modal__subheader'>
            Log In with any of the following account details
          </span>
          <h2> Acc 1: user: js, pin 1111</h2>
          <h2> Acc 2: user: ee, pin 2222</h2>
          <h2> Acc 3: user: jd, pin 3333</h2>
          <h2> Acc 4: user: stw, pin 4444</h2>
          <Link to='/howto'>
            <button>How To use</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
