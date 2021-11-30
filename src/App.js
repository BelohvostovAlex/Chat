import React from "react";
import socket from "./socket";

import JoinBlock from "./components/JoinBlock";
import reducer from "./reducer";

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css'

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    isAuth: false,
  })

  const onLogin = () => {
    dispatch({
      type: 'JOINED',
      payload: true
    })

  }

  return (
    <div className="container">
     {!state.joined &&  <JoinBlock onLogin={onLogin}/>}
    </div>
  );
}

export default App;
