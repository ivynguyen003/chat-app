import React, { Component } from "react";
import UserImage from "../profile.png";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faSearch from "@fortawesome/fontawesome-free-solid/faSearch";
import "./RoomList.css";
import "../App.css";

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      name: ""
    };
    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room), name: "" });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.name) {
      return;
    }
    this.roomsRef.push({ name: this.state.name });
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  activeRoom(room) {
    this.props.activeRoom(room);
  }

  render() {
    return <section>
        <div className="header">
          <h2>Hello Ivy!</h2>
          <img className="user" src={UserImage} alt={"user image"} />
        </div>
        <div>
          <form onSubmit={e => this.handleSubmit(e)}>
            <input name="text" value={this.state.name} onChange={e => this.handleChange(e)} />
            <button type="submit">
              <FontAwesomeIcon icon={faSearch} pulse className="search" transform="grow-6" />
            </button>
          </form>
        </div>
        <section className="room-list">
          {this.state.rooms.map((room, index) => (
            <ul className="each-room" key={index}>
              <li onClick={() => this.props.activeRoom(room)}>
                {room.name}
              </li>
            </ul>
          ))}
        </section>
      </section>;
  }
}

export default RoomList;
