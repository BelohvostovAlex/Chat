import React from "react";
import socket from "./socket";

import JoinBlock from "./components/JoinBlock";
import Chat from "./components/Chat";
import reducer from "./reducer";

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css'
import { Socket } from "socket.io-client";

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: []
  })

  const onLogin = (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj
    })
    socket.emit('ROOM:JOIN', obj)
  }
  
  React.useEffect(() => {
    socket.on('ROOM:JOINED', (users) =>dispatch({
      type: 'SET_USERS',
      payload: users
    }))
  }, [])

  return (
    <div className="container">
     {!state.joined ?  <JoinBlock onLogin={onLogin}/> : <Chat {...state}/>}
    </div>
  );
}

export default App;
