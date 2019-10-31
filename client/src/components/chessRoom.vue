<template>
  <div>
    <div class="create">
      <form @submit="evt=>createRoom(evt)">
        <input type="text" v-model="roomName" placeholder="New Room Name..." />
        <button class="createButton">Create Chess Room</button>
      </form>
      <div class="roomList">
        <table id="roomTable">
          <thead>
            <th>Room Name</th>
            <th>Join Room</th>
          </thead>
          <tbody id="roomTableBody">
            <tr :key="room" v-for="room in roomList">
              <td>
                <span>{{room}}</span>
              </td>
              <td>
                <button class="roomJoin" @click="joinRoom(room)">Join</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Room",

  data() {
    return {
      roomName: "",
      roomList: []
    };
  },

  mounted() {
    this.roomList = [];
    this.$socket.emit("requestRoomList");

    this.sockets.subscribe("roomListServer", roomListServer => {
      this.roomList = roomListServer;
    });

    this.sockets.subscribe("roomList", roomList => {
      this.roomList = roomList;
    });
  },

  methods: {
    createRoom(evt) {
      evt.preventDefault();
      var count = 0;
      for (let room of this.roomList) {
        if (room === this.roomName) {
          count++;
        }
      }
      if (count === 0) {
        this.roomList.push(this.roomName);
        this.$socket.emit("roomCreated", this.roomName);
        this.roomName = "";
      } else {
        alert("This room is existed.");
        this.roomName = "";
      }
    },
    joinRoom(roomName) {
      this.$router.push(`/chess/${roomName}`);
    }
  },
  sockets: {
    connect() {
      /*eslint-disable */
      console.log("socket connected");
    }
  }
};
</script>

<style lang='scss'>
.roomList {
  width: 1000px;
  height: 1000px;
  overflow-y: scroll;
  overflow-x: hidden;
  left: -30%;
  position: relative;
}

.createButton {
  margin: 20px;
  height: 50px;
  border-radius: 20px;
  background: #2266ff;
  border: 1px solid #2266ff;
  box-shadow: 0px 0px 10px 5px #2266ff;
  font-size: 20px;
}

.roomJoin {
  margin: 20px;
  height: 50px;
  width: 100px;
  border-radius: 20px;
  background: #2288ff;
  border: 1px solid #2266ff;
  font-size: 20px;
}

input {
  height: 40px;
  font-size: 20px;
  background: #33ffff;
}
.create {
  position: absolute;
  top: 100px;
  left: 570px;
}
table {
  margin: 30px;
  position: relative;
  height: auto;
  width: 100%;

  overflow: scroll;
  & th {
    border: 1px solid black;
    background: black;
    color: burlywood;
    font-size: 25px;
  }
  & td {
    margin: 0px;
    background: gray;
    text-align: center;
    max-width: 300px;
    min-width: 300px;
    word-wrap: break-word;

    & span {
      font-size: 30px;
    }
  }
}
</style>