import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      name: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room), name:'' });
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.name) { return }
    this.roomsRef.push({ name: this.state.name });

  }

  handleChange(e) {
    this.setState({ name: e.target.value })
  }

  activeRoom(room){
    this.props.activeRoom(room);
  }

  render() {
    return (
      <section>
        <div >
          {
            this.state.rooms.map((room, index) =>
              <ul className="each-room" key={index} > 
                <li onClick = {()=>this.props.activeRoom(room)}>
                {room.name} 
                </li>
              </ul>
            )
          }
        </div>
        <div>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <input name="text" value={this.state.name} onChange={(e) => this.handleChange(e)}>
            </input>
            <input type="submit" />
          </form>
        </div>
      </section>
    )
  }

}

export default RoomList;