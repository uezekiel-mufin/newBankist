import React, { useState, useRef, useEffect } from "react";
import "./home.css";
import data from "./data";
import Logo from "../assets/logo.png";

const Home = () => {
  const account1 = {
    owner: "Jonas Schmedtmann",
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
  };

  const account2 = {
    owner: "Jessica Davis",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  };

  const account3 = {
    owner: "Steven Thomas Williams",
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
  };

  const account4 = {
    owner: "Sarah Smith",
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
  };

  const accounts = [account1, account2, account3, account4];
  const mainRef = useRef(null);
  const loginRef = useRef("");
  const nameRef = useRef("");
  const pinRef = useRef("");
  const amountRef = useRef("");
  const transferRef = useRef("");
  const closePinRef = useRef("");
  const closeUserRef = useRef("");
  const [username, setUsername] = useState("");
  const [current, setCurrent] = useState([]);
  const [currentMovements, setCurrentMovements] = useState([]);
  const [userpin, setUserpin] = useState("");
  const [curBalance, setCurBalance] = useState("");
  const [curDeposit, setCurDeposit] = useState("");
  const [curWithdrawals, setCurWithdrawals] = useState("");
  const [welcome, setWelcome] = useState("");
  const [curInterest, setCurInterest] = useState("");
  const [curReceiver, setCurReceiver] = useState("");
  const [tfAmount, setTfAmount] = useState("");
  const [closeUser, setCloseUser] = useState("");
  const [closePin, setClosePin] = useState("");
  const [curAccounts, setCurAccounts] = useState(accounts);
  const [sorted, setSorted] = useState(false);

  //   console.log(current);
  //   console.log(currentMovements);

  ////////////Generate Username////////////////////

  const generateUsername = (account) => {
    account.forEach(
      (acc, ind) =>
        (acc.userName = acc.owner
          .toLowerCase()
          .split(" ")
          .map((own, ind) => own[0])
          .join(""))
    );
  };
  generateUsername(accounts);
  //   console.log(accounts);
  const handleUserName = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  ///////////Clear All Input Field///////////
  const clearInput = () => {
    pinRef.current.value = "";
    nameRef.current.value = "";
    amountRef.current.value = transferRef.current.value = "";
    closePinRef.current.value = closeUserRef.current.value = "";
  };

  /////////////////DISPLAY UI/////////////////////////////////

  let currentAccount;
  const displayUI = (accs) => {
    currentAccount = accs?.find(
      (acc, ind) => acc.userName === username && acc.pin === +userpin
    );
    if (currentAccount) {
      clearInput();
      setCurrent(currentAccount);
      setCurrentMovements(currentAccount.movements);
      setWelcome(`Welcome back ${currentAccount.owner}`);
      calcBalance(currentAccount);
      calcDeposits(currentAccount);
      calcWithdrawals(currentAccount);
      calcInterest(currentAccount);
      mainRef.current.style.opacity = 1;
      loginRef.current.textContent = `Welcome Back ${currentAccount.owner}`;
      setTimeout(() => {
        loginRef.current.textContent = `${currentAccount.owner}`;
      }, 4000);
    } else {
      return;
    }
  };

  ///////////////////////Calculating Balance/////////////////////////
  const calcBalance = (acc) => {
    const balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
    setCurBalance(balance);
    // console.log(balance);
  };
  ////////////////Calculating deposits////////////////////////////////
  const calcDeposits = (acc) => {
    const deposits = acc?.movements
      .filter((mov, ind) => mov > 0)
      .reduce((acc, cur) => acc + cur, 0);
    setCurDeposit(deposits);
  };

  //////////////////calculating withdrawals///////////////////////////
  const calcWithdrawals = (acc) => {
    const withdrawals = acc?.movements
      .filter((mov, ind) => mov < 0)
      .reduce((acc, cur) => acc + cur, 0);
    setCurWithdrawals(Math.abs(withdrawals));
  };

  /////////////calculating interests/////////////////////////////////
  const calcInterest = (acc) => {
    const interest = acc.movements
      .filter((mov, ind) => mov > 0)
      .map((mov, ind) => mov * (acc.interestRate / 100))
      .filter((int, ind) => int > 0)
      .reduce((cur, acc) => cur + acc, 0);
    setCurInterest(interest);
  };

  ///////////////////////Handle Log In ///////////////////////////////
  const handleLogin = (e) => {
    e.preventDefault();
    displayUI(curAccounts);
    clearInput();
  };

  /////////////UpdateUI////////////////
  const updateUI = (currentAcc) => {
    setCurrent(currentAcc);
    calcBalance(currentAcc);
    calcDeposits(currentAcc);
    calcWithdrawals(currentAcc);
    calcInterest(currentAcc);
  };

  /////////////Transfer Money///////////////////////
  const transfer = (e, accs) => {
    e.preventDefault();
    const receiver = accs.find((acc, ind) => acc.userName === curReceiver);
    clearInput();
    if (curBalance > tfAmount && receiver) {
      receiver.movements.push(+tfAmount);
      currentMovements.push(-tfAmount);
      updateUI(current);
    } else {
      return;
    }
    console.log(receiver);
    console.log(current);
  };

  //////////////////Sort Movements///////////////////////////

  const btnSort = (e, mov) => {
    e.preventDefault();
    setSorted(!sorted);

    setCurrentMovements(sorted ? mov.slice().sort((a, b) => a - b) : mov);
    console.log(currentMovements);
    console.log(sorted);
  };

  /////////////////close Account////////////////////
  const handleClose = (e, accs) => {
    e.preventDefault();
    const index = accs.findIndex(
      (mov) => mov.userName === closeUser && mov.pin === +closePin
    );
    clearInput();
    if (current.userName === closeUser && current.pin === +closePin) {
      accs.splice(index, 1);
      setCurAccounts((prev) => prev);
      console.log(accs);
      mainRef.current.style.opacity = 0;
      loginRef.current.textContent = "Log in";
    }
  };

  return (
    <div className='home'>
      <nav className='navbar'>
        <div className='welcome' ref={loginRef}>
          Log In
        </div>
        <div className='logo'>
          <img src={Logo} alt='logo' />
        </div>
        <div className='login'>
          <form className='login' onChange={(e) => e.preventDefault()}>
            <input
              ref={nameRef}
              type='text'
              placeholder='user'
              className='login__input login__input--user'
              onChange={(e) => {
                e.preventDefault();
                handleUserName(e);
              }}
            />
            <input
              ref={pinRef}
              type='text'
              placeholder='PIN'
              maxLength='4'
              className='login__input login__input--pin'
              onChange={(e) => setUserpin(e.target.value)}
            />
            <button onClick={(e) => handleLogin(e)} className='login__btn'>
              &rarr;
            </button>
          </form>
        </div>
      </nav>
      {current && (
        <main className='main' ref={mainRef}>
          <div className='balance'>
            <div>
              <p className='balance__label'>Current balance</p>
              <p className='balance__date'>
                As of <span className='date'>05/03/2037</span>
              </p>
            </div>
            <p className='balance__value'>{curBalance}€</p>
          </div>
          <div className='movement__operations'>
            <div className='mainMiddle'>
              <div className='movements'>
                {currentMovements?.map((mov, ind) => (
                  <div className='movements__row' key={ind}>
                    <div
                      className={
                        mov > 0
                          ? "movements__type movements__type--deposit"
                          : "movements__type movements__type--withdrawal"
                      }
                    >
                      {ind}
                      {mov > 0 ? "deposits" : "withdrawals"}
                    </div>
                    <div className='movements__date'>3 days ago</div>
                    <div className='movements__value'>{mov}€</div>
                  </div>
                ))}
              </div>

              <div className='operations'>
                {/* OPERATION: TRANSFERS */}
                <div className='operation operation--transfer'>
                  <h2>Transfer money</h2>
                  <form
                    className='form form--transfer'
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <input
                      ref={amountRef}
                      type='text'
                      onChange={(e) => setCurReceiver(e.target.value)}
                      className='form__input form__input--to'
                    />
                    <input
                      ref={transferRef}
                      type='number'
                      className='form__input form__input--amount'
                      onChange={(e) => setTfAmount(e.target.value)}
                    />
                    <button
                      onClick={(e) => transfer(e, curAccounts)}
                      className='form__btn form__btn--transfer'
                    >
                      &rarr;
                    </button>
                    <label className='form__label'>Transfer to</label>
                    <label className='form__label'>Amount</label>
                  </form>
                </div>
                {/*  OPERATION: LOAN  */}
                <div className='operation operation--loan'>
                  <h2>Request loan</h2>
                  <form className='form form--loan'>
                    <input
                      type='number'
                      className='form__input form__input--loan-amount'
                    />
                    <button className='form__btn form__btn--loan'>
                      &rarr;
                    </button>
                    <label className='form__label form__label--loan'>
                      Amount
                    </label>
                  </form>
                </div>

                {/* OPERATION: CLOSE */}
                <div className='operation operation--close'>
                  <h2>Close account</h2>
                  <form className='form form--close'>
                    <input
                      ref={closeUserRef}
                      value={closeUser}
                      type='text'
                      className='form__input form__input--user'
                      onChange={(e) => setCloseUser(e.target.value)}
                    />
                    <input
                      ref={closePinRef}
                      value={closePin}
                      type='password'
                      maxLength='6'
                      onChange={(e) => setClosePin(e.target.value)}
                      className='form__input form__input--pin'
                    />
                    <button
                      onClick={(e) => handleClose(e, curAccounts)}
                      className='form__btn form__btn--close'
                    >
                      &rarr;
                    </button>
                    <label className='form__label'>Confirm user</label>
                    <label className='form__label'>Confirm PIN</label>
                  </form>
                </div>
              </div>
            </div>

            <div className='footer'>
              {/* SUMMARY  */}
              <div className='summary'>
                <p className='summary__label'>In</p>
                <p className='summary__value summary__value--in'>
                  {curDeposit}€
                </p>
                <p className='summary__label'>Out</p>
                <p className='summary__value summary__value--out'>
                  {curWithdrawals}
                </p>
                <p className='summary__label'>Interest</p>
                <p className='summary__value summary__value--interest'>
                  {curInterest}€
                </p>
                <button
                  onClick={(e) => btnSort(e, currentMovements)}
                  className='btn--sort'
                >
                  &#8595;&#8593;SORT
                </button>
              </div>
              <p className='logout-timer'>
                You will be logged out in <span className='timer'>05:00</span>
              </p>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Home;
