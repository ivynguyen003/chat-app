import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as firebase from "firebase";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";
require("dotenv").config();

var config = {
  apiKey: process.env.REACT_APP_FIREBASE,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: "chat-app-ivy",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_ID
};

console.log(process.env.REACT_APP_DATABASE_URL);
console.log(process.env.REACT_APP_FIREBASE);

firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: "",
      activeKey: ""
    };
  }

  selectRoom = (room) => {
    this.setState({ activeKey: room.key });
    this.setState({ activeRoom: room });
    console.log(this);
  };

  render() {
    return <div className="room-container">
        <aside className="side-bar">
          <h1>Let's Chat</h1>
          <RoomList firebase={firebase} activeRoom={this.selectRoom} />
        </aside>
        <section className="room-display">
          <section className="room-active">
            <h1>{this.state.activeRoom.name}</h1>
          </section>
          <section className="message">
            <MessageList firebase={firebase} activeKey={this.state.activeKey} />
          </section>
        </section>
      </div>;
  }
}

export default App;
