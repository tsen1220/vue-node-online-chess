<template>
  <div>
    <div v-if="token" id="chessBoard"></div>
    <div id="loginMsg" v-else-if="!token">{{loginMsg}}</div>
    <div id="pawnButton"></div>

    <form id="chatbox" v-if="token" @submit="evt=>{evt.preventDefault()}">
      <input type="text" id="msg-input" v-model="msgInput" />
      <button type="submit" id="msg-button" @click="sendMsg()">Send</button>
    </form>
    <div v-if="token" id="msg-container"></div>
  </div>
</template>

<script>
import piece from "../assets/piece";
import move from "../assets/move";
import { mapState } from "vuex";

export default {
  name: "chessBoard",

  data() {
    return {
      //true為輪到白方回合 false為輪到黑方回合
      turn: true,
      selected: false,
      selectrow: Number,
      selectcolumn: Number,
      selectpiece: Number,
      targetrow: Number,
      targetcolumn: Number,
      targetpiece: Number,
      selecteddom: [],
      targetdom: [],
      gamewatching: true,
      loginMsg: "Please Login to play online chess.",
      roomName: this.$route.params.chessroom,
      //  兵 = 1             >0白方
      //  城堡 = 2           <0黑方
      //  騎士 = 3
      //  主教 = 4
      //  皇后 = 5
      //  國王 = 6
      boardList: [
        [-2, -3, -4, -5, -6, -4, -3, -2],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [2, 3, 4, 5, 6, 4, 3, 2]
      ],
      resetBoard: [
        [-2, -3, -4, -5, -6, -4, -3, -2],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [2, 3, 4, 5, 6, 4, 3, 2]
      ],
      msgInput: ""
    };
  },
  methods: {
    //畫棋盤
    drawBoard() {
      var chessBoard = document.getElementById("chessBoard");
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          var div = document.createElement("div");
          div.id = `gamecell${i}${j}`;
          div.className = "gamecell";
          div.setAttribute("row", i);
          div.setAttribute("column", j);
          chessBoard.appendChild(div).style.backgroundColor =
            parseInt(i + j) % 2 == 0 ? "#FFFFFF" : "#ababab";
        }
      }
    },
    //設定初始棋子位置
    placeInitPiece() {
      for (let [i, list] of this.boardList.entries()) {
        for (let [j, li] of list.entries()) {
          var divElement = document.getElementById(`gamecell${i}${j}`);
          divElement.setAttribute("piece", li);
        }
      }
    },
    //繪製棋子
    drawPiece(board) {
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          piece.drawPieceAtBoard(board, i, j);
        }
      }
    },
    selectMoveTarget(domelement) {
      for (let dom of domelement) {
        dom.addEventListener("click", () => {
          if (this.gamewatching === true) {
            return;
          } else {
            if (this.selected) {
              this.targetrow = parseInt(dom.getAttribute("row"));
              this.targetcolumn = parseInt(dom.getAttribute("column"));
              this.targetpiece = parseInt(dom.getAttribute("piece"));
              this.targetdom = dom;

              if (this.turn === true && this.selectpiece > 0) {
                move.movePiece(
                  this.selectpiece,
                  this.selectrow,
                  this.selectcolumn,
                  this.selecteddom,
                  this.targetpiece,
                  this.targetrow,
                  this.targetcolumn,
                  this.targetdom,
                  this.boardList,
                  this.roomName
                );
                piece.drawPieceAtBoard(
                  this.boardList,
                  this.selectrow,
                  this.selectcolumn
                );
                piece.drawPieceAtBoard(
                  this.boardList,
                  this.targetrow,
                  this.targetcolumn
                );

                if (
                  this.boardList[this.selectrow][this.selectcolumn] !==
                  this.selectpiece
                ) {
                  this.$socket.emit(
                    "boardRecord",
                    this.boardList,
                    this.selectrow,
                    this.selectcolumn,
                    this.selecteddom,
                    this.selectpiece,
                    this.targetrow,
                    this.targetcolumn,
                    this.targetdom,
                    this.targetpiece,
                    this.roomName
                  );

                  if (this.targetpiece === -6) {
                    this.$socket.emit("whiteWin", this.roomName);
                  }

                  this.turn = false;
                  this.gamewatching = true;
                  this.$socket.emit(
                    "gamewatch",
                    false,
                    this.turn,
                    this.roomName
                  );
                }
              }

              if (this.turn === false && this.selectpiece < 0) {
                move.movePiece(
                  this.selectpiece,
                  this.selectrow,
                  this.selectcolumn,
                  this.selecteddom,
                  this.targetpiece,
                  this.targetrow,
                  this.targetcolumn,
                  this.targetdom,
                  this.boardList,
                  this.roomName
                );
                piece.drawPieceAtBoard(
                  this.boardList,
                  this.selectrow,
                  this.selectcolumn
                );
                piece.drawPieceAtBoard(
                  this.boardList,
                  this.targetrow,
                  this.targetcolumn
                );

                if (
                  this.boardList[this.selectrow][this.selectcolumn] !==
                  this.selectpiece
                ) {
                  this.$socket.emit(
                    "boardRecord",
                    this.boardList,
                    this.selectrow,
                    this.selectcolumn,
                    this.selecteddom,
                    this.selectpiece,
                    this.targetrow,
                    this.targetcolumn,
                    this.targetdom,
                    this.targetpiece,
                    this.roomName
                  );

                  if (this.targetpiece === 6) {
                    this.$socket.emit("blackWin", this.roomName);
                  }
                  this.turn = true;
                  this.gamewatching = true;
                  this.$socket.emit(
                    "gamewatch",
                    false,
                    this.turn,
                    this.roomName
                  );
                }
              }

              this.selected = false;
              this.selecteddom.style.backgroundColor =
                (this.selectrow + this.selectcolumn) % 2 === 0
                  ? "#FFFFFF"
                  : "#ababab";
            } else {
              this.selectrow = parseInt(dom.getAttribute("row"));
              this.selectcolumn = parseInt(dom.getAttribute("column"));
              this.selectpiece = parseInt(dom.getAttribute("piece"));

              this.selected = true;
              this.selecteddom = dom;
              dom.style.backgroundColor = "green";
            }
          }
        });
      }
    },
    user() {
      var userid = this.userid;
      this.$socket.emit("newuser", userid, this.roomName);
      this.appendMsg("You join!! ");
    },
    copy(Arr) {
      var list = [];
      for (let a of Arr) {
        list.push(a.slice());
      }
      return list;
    },
    appendMsg(message) {
      const msgContainer = document.getElementById("msg-container");
      var div = document.createElement("div");
      div.width = "300px";
      div.overflow = "hidden";
      var textnode = document.createTextNode(message);
      div.appendChild(textnode);
      msgContainer.appendChild(div);
    },
    sendMsg() {
      this.$socket.emit("sendMsg", this.msgInput, this.userid, this.roomName);
      this.appendMsg(this.userid + ":" + this.msgInput);
      this.msgInput = "";
    }
  },
  computed: {
    ...mapState(["token", "userid", "type", "error"])
  },
  beforeRouteLeave(to, from, next) {
    this.sockets.unsubscribe("gamestart");

    this.sockets.unsubscribe("gamewatch");

    this.sockets.unsubscribe("record");

    this.sockets.unsubscribe("roomFull");

    this.sockets.unsubscribe("NotExist");

    this.sockets.unsubscribe("recMsg");

    this.sockets.unsubscribe("start");

    this.sockets.unsubscribe("startmsg");

    this.sockets.unsubscribe("changePawn");

    this.sockets.unsubscribe("BlackWin");

    this.sockets.unsubscribe("WhiteWin");

    this.$socket.emit("userLeave", this.roomName);

    this.sockets.unsubscribe("disconnected");

    next();
  },
  mounted() {
    this.user();
    this.drawBoard();
    this.placeInitPiece();
    this.drawPiece(this.boardList);
    var div = document.getElementsByClassName("gamecell");
    this.selectMoveTarget(div);

    this.sockets.subscribe("disconnected", () => {
      this.gamewatching = true;
      this.turn = true;
      this.selected = false;
      this.appendMsg(
        "Other player leaves this room. Wait for new player for a few time. "
      );

      for (let [i, list] of this.resetBoard.entries()) {
        for (let [j, li] of list.entries()) {
          var divElement = document.getElementById(`gamecell${i}${j}`);
          divElement.setAttribute("piece", li);
        }
      }

      setTimeout(() => {
        this.drawPiece(this.resetBoard);
        var reset = this.copy(this.resetBoard);
        this.boardList = reset;
      }, 5000);
    });

    this.sockets.subscribe("BlackWin", () => {
      this.gamewatching = true;
      this.turn = true;
      this.selected = false;
      this.appendMsg("Black Win");
      this.appendMsg("Wait 5 second for resetting the board. ");

      for (let [i, list] of this.resetBoard.entries()) {
        for (let [j, li] of list.entries()) {
          var divElement = document.getElementById(`gamecell${i}${j}`);
          divElement.setAttribute("piece", li);
        }
      }

      setTimeout(() => {
        this.drawPiece(this.resetBoard);
        var reset = this.copy(this.resetBoard);
        this.boardList = reset;
        this.appendMsg("原白方先攻，為白方。");
      }, 4000);
    });

    this.sockets.subscribe("WhiteWin", () => {
      this.gamewatching = true;
      this.turn = true;
      this.selected = false;
      this.appendMsg("White Win");
      this.appendMsg("Wait 5 second for resetting the board. ");

      for (let [i, list] of this.resetBoard.entries()) {
        for (let [j, li] of list.entries()) {
          var divElement = document.getElementById(`gamecell${i}${j}`);
          divElement.setAttribute("piece", li);
        }
      }

      setTimeout(() => {
        this.drawPiece(this.resetBoard);
        var reset = this.copy(this.resetBoard);
        this.boardList = reset;
        this.appendMsg("原黑方先攻，為黑方。");
      }, 4000);
    });

    this.sockets.subscribe("gamestart", start => {
      this.gamewatching = start;
    });

    this.sockets.subscribe("gamewatch", data => {
      this.turn = data.turn;
      this.gamewatching = data.watch;
    });

    this.sockets.subscribe("record", data => {
      this.boardList = data.gameBoard;
      piece.drawPieceAtBoard(data.gameBoard, data.selectrow, data.selectcolumn);
      piece.drawPieceAtBoard(data.gameBoard, data.targetrow, data.targetcolumn);

      var targetdom = document.getElementById(
        `gamecell${data.targetrow}${data.targetcolumn}`
      );
      var selectdom = document.getElementById(
        `gamecell${data.selectrow}${data.selectcolumn}`
      );

      targetdom.setAttribute("piece", data.selectpiece);
      selectdom.setAttribute("piece", 0);
    });

    this.sockets.subscribe("roomFull", () => {
      this.$router.push("/full");
    });

    this.sockets.subscribe("NotExist", () => {
      this.$router.push("/chess");
    });

    this.sockets.subscribe("recMsg", data => {
      this.appendMsg(`${data.userid}:${data.msg}`);
    });

    this.sockets.subscribe("start", msg => {
      this.appendMsg(msg);
    });

    this.sockets.subscribe("startmsg", msg => {
      this.appendMsg(msg);
    });

    this.sockets.subscribe("changePawn", data => {
      var dom = document.getElementById(
        `gamecell${data.targetrow}${data.targetcolumn}`
      );

      this.boardList[data.targetrow][data.targetcolumn] = data.piece;
      dom.setAttribute("piece", data.piece);
      piece.drawPieceAtBoard(this.boardList, data.targetrow, data.targetcolumn);
    });
  },
  sockets: {
    connect() {
      /*eslint-disable */

      console.log("socket connected");
    }
  }
};
</script>

<style lang="scss">
#chessBoard {
  width: 560px;
  height: 560px;
  border: 1px solid black;
  position: absolute;
  left: 420px;
  top: 100px;
  & div {
    width: 70px;
    height: 70px;
    float: left;
    cursor: pointer;
  }
}

#pawnButton {
  position: absolute;
  left: 520px;
  top: 220px;
  z-index: 100;
  & button {
    width: 100px;
    height: 100px;
    background: powderblue;
    border-radius: 30px;
    & div {
      width: 70px;
      height: 70px;
      float: left;
      cursor: pointer;
    }
  }
}

#loginMsg {
  position: absolute;
  top: 100px;
  font-size: 30px;
}

#chatbox {
  position: relative;
  display: block;
  left: 1000px;

  border-radius: 3px;
  width: 400px;
  top: 600px;
}

#msg-input {
  position: absolute;
  bottom: 8px;
  left: 0px;
  width: 320px;
}
#msg-button {
  position: absolute;
  bottom: 20px;
  right: 0px;
  background: gray;
  border: 1px solid gray;
  border-radius: 10px;
  font-size: 22px;
}
#msg-container {
  position: relative;
  width: 380px;
  border: 1px solid black;
  height: 300px;
  left: 1000px;
  top: 200px;
  overflow-y: scroll;
  word-wrap: break-word;
  font-family: "PT Sans", sans-serif;
}
</style>
