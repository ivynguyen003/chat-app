import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';

var config = {
  apiKey: "AIzaSyAIAFENMjKyeMklX30r5GvmC5PIK1RmDJM",
  authDomain: "chat-app-ivy.firebaseapp.com",
  databaseURL: "https://chat-app-ivy.firebaseio.com",
  projectId: "chat-app-ivy",
  storageBucket: "chat-app-ivy.appspot.com",
  messagingSenderId: "814466748811"
};
firebase.initializeApp(config);

class App extends Component {

  render() {
    return (
      <div className="App">
        <main>
          <RoomList firebase={firebase}/>
        </main>
      </div>
    );
  }
}

export default App;
