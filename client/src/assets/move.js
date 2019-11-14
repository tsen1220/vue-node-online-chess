const piece = require("./piece");
const io = require("socket.io-client");
const socket = io("http://localhost:1111");

function movePiece(
  selectpiece,
  selectrow,
  selectcolumn,
  selectdom,
  targetpiece,
  targetrow,
  targetcolumn,
  targetdom,
  board,
  roomName
) {
  var checkdom = [];
  var count = 0;
  var bishopcolumn = 0;
  var bishoprow = 0;

  switch (selectpiece) {
    //黑兵
    case -1:
      if (selectrow === 1) {
        if (
          (Math.abs(targetrow - selectrow) === 1 ||
            Math.abs(targetrow - selectrow) === 2) &&
          targetpiece === 0 &&
          targetcolumn - selectcolumn === 0 &&
          board[selectrow + 1][selectcolumn] === 0
        ) {
          replacePiece(
            selectdom,
            selectpiece,
            selectrow,
            selectcolumn,
            targetdom,
            targetrow,
            targetcolumn,
            board
          );
        } else if (
          targetpiece > 0 &&
          targetrow - selectrow === 1 &&
          Math.abs(targetcolumn - selectcolumn) === 1
        ) {
          replacePiece(
            selectdom,
            selectpiece,
            selectrow,
            selectcolumn,
            targetdom,
            targetrow,
            targetcolumn,
            board
          );
        }
      } else if (
        selectrow !== 1 &&
        targetrow - selectrow === 1 &&
        targetpiece === 0 &&
        targetcolumn - selectcolumn === 0
      ) {
        if (targetrow === 7) {
          blackPawnButton(
            "pawnButton",
            board,
            targetrow,
            targetcolumn,
            roomName
          );
        }
        replacePiece(
          selectdom,
          selectpiece,
          selectrow,
          selectcolumn,
          targetdom,
          targetrow,
          targetcolumn,
          board
        );
      } else if (
        selectrow !== 1 &&
        targetpiece > 0 &&
        targetrow - selectrow === 1 &&
        Math.abs(targetcolumn - selectcolumn) === 1
      ) {
        if (targetrow === 7) {
          blackPawnButton(
            "pawnButton",
            board,
            targetrow,
            targetcolumn,
            roomName
          );
        }
        replacePiece(
          selectdom,
          selectpiece,
          selectrow,
          selectcolumn,
          targetdom,
          targetrow,
          targetcolumn,
          board
        );
      }

      break;

    //白兵
    case 1:
      if (selectrow === 6) {
        if (
          (Math.abs(targetrow - selectrow) === 1 ||
            Math.abs(targetrow - selectrow) === 2) &&
          targetpiece === 0 &&
          targetcolumn - selectcolumn === 0 &&
          board[selectrow - 1][selectcolumn] === 0
        ) {
          replacePiece(
            selectdom,
            selectpiece,
            selectrow,
            selectcolumn,
            targetdom,
            targetrow,
            targetcolumn,
            board
          );
        } else if (
          targetpiece < 0 &&
          targetrow - selectrow === -1 &&
          Math.abs(targetcolumn - selectcolumn) === 1
        ) {
          replacePiece(
            selectdom,
            selectpiece,
            selectrow,
            selectcolumn,
            targetdom,
            targetrow,
            targetcolumn,
            board
          );
        }
      } else if (
        selectrow !== 6 &&
        targetrow - selectrow === -1 &&
        targetpiece === 0 &&
        targetcolumn - selectcolumn === 0
      ) {
        if (targetrow === 0) {
          whitePawnButton(
            "pawnButton",
            board,
            targetrow,
            targetcolumn,
            roomName
          );
        }
        replacePiece(
          selectdom,
          selectpiece,
          selectrow,
          selectcolumn,
          targetdom,
          targetrow,
          targetcolumn,
          board
        );
      } else if (
        selectrow !== 6 &&
        targetpiece < 0 &&
        targetrow - selectrow === -1 &&
        Math.abs(targetcolumn - selectcolumn) === 1
      ) {
        if (targetrow === 0) {
          whitePawnButton(
            "pawnButton",
            board,
            targetrow,
            targetcolumn,
            roomName
          );
        }
        replacePiece(
          selectdom,
          selectpiece,
          selectrow,
          selectcolumn,
          targetdom,
          targetrow,
          targetcolumn,
          board
        );
      }

      break;

    //黑馬
    case -3:
      if (
        Math.abs(targetcolumn - selectcolumn) === 2 &&
        Math.abs(targetrow - selectrow) === 1 &&
        targetpiece >= 0
      ) {
        replacePiece(
          selectdom,
          selectpiece,
          selectrow,
          selectcolumn,
          targetdom,
          targetrow,
          targetcolumn,
          board
        );
      } else if (
        Math.abs(targetcolumn - selectcolumn) === 1 &&
        Math.abs(targetrow - selectrow) === 2 &&
        targetpiece >= 0
      ) {
        replacePiece(
          selectdom,
          selectpiece,
          selectrow,
          selectcolumn,
          targetdom,
          targetrow,
          targetcolumn,
          board
        );
      }

      break;

    //白馬
    case 3:
      if (
        Math.abs(targetcolumn - selectcolumn) === 2 &&
        Math.abs(targetrow - selectrow) === 1 &&
        targetpiece <= 0
      ) {
        replacePiece(
          selectdom,
          selectpiece,
          selectrow,
          selectcolumn,
          targetdom,
          targetrow,
          targetcolumn,
          board
        );
      } else if (
        Math.abs(targetcolumn - selectcolumn) === 1 &&
        Math.abs(targetrow - selectrow) === 2 &&
        targetpiece <= 0
      ) {
        replacePiece(
          selectdom,
          selectpiece,
          selectrow,
          selectcolumn,
          targetdom,
          targetrow,
          targetcolumn,
          board
        );
      }

      break;

    //黑城堡
    case -2:
      if (
        (Math.abs(targetcolumn - selectcolumn) === 0 ||
          Math.abs(targetrow - selectrow) === 0) &&
        targetpiece >= 0
      ) {
        if (targetrow > selectrow) {
          for (let i = selectrow + 1; i < targetrow; i++) {
            checkdom = document.getElementById(`gamecell${i}${targetcolumn}`);
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
          }
        } else if (targetrow < selectrow) {
          for (let i = targetrow + 1; i < selectrow; i++) {
            checkdom = document.getElementById(`gamecell${i}${targetcolumn}`);

            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
          }
        } else if (targetcolumn > selectcolumn) {
          for (let i = selectcolumn + 1; i < targetcolumn; i++) {
            checkdom = document.getElementById(`gamecell${targetrow}${i}`);
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
          }
        } else if (targetcolumn < selectcolumn) {
          for (let i = targetcolumn + 1; i < selectcolumn; i++) {
            checkdom = document.getElementById(`gamecell${targetrow}${i}`);
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
          }
        }

        if (count === 0) {
          replacePiece(
            selectdom,
            selectpiece,
            selectrow,
            selectcolumn,
            targetdom,
            targetrow,
            targetcolumn,
            board
          );
          count = 0;
        }
      }

      break;

    //白城堡
    case 2:
      if (
        (Math.abs(targetcolumn - selectcolumn) === 0 ||
          Math.abs(targetrow - selectrow) === 0) &&
        targetpiece <= 0
      ) {
        if (targetrow > selectrow) {
          for (let i = selectrow + 1; i < targetrow; i++) {
            checkdom = document.getElementById(`gamecell${i}${targetcolumn}`);
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
          }
        } else if (targetrow < selectrow) {
          for (let i = targetrow + 1; i < selectrow; i++) {
            checkdom = document.getElementById(`gamecell${i}${targetcolumn}`);

            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
          }
        } else if (targetcolumn > selectcolumn) {
          for (let i = selectcolumn + 1; i < targetcolumn; i++) {
            checkdom = document.getElementById(`gamecell${targetrow}${i}`);
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
          }
        } else if (targetcolumn < selectcolumn) {
          for (let i = targetcolumn + 1; i < selectcolumn; i++) {
            checkdom = document.getElementById(`gamecell${targetrow}${i}`);
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
          }
        }

        if (count === 0) {
          replacePiece(
            selectdom,
            selectpiece,
            selectrow,
            selectcolumn,
            targetdom,
            targetrow,
            targetcolumn,
            board
          );
          count = 0;
        }
      }

      break;

    //黑主教
    case -4:
      if (
        Math.abs((targetcolumn - selectcolumn) / (targetrow - selectrow)) ===
          1 &&
        targetpiece >= 0
      ) {
        if (targetrow < selectrow && targetcolumn > selectcolumn) {
          bishopcolumn = selectcolumn + 1;
          bishoprow = selectrow - 1;
          while (bishoprow > targetrow) {
            checkdom = document.getElementById(
              `gamecell${bishoprow}${bishopcolumn}`
            );
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
            bishopcolumn++;
            bishoprow--;
          }
        } else if (targetrow < selectrow && targetcolumn < selectcolumn) {
          bishopcolumn = selectcolumn - 1;
          bishoprow = selectrow - 1;
          while (bishoprow > targetrow) {
            checkdom = document.getElementById(
              `gamecell${bishoprow}${bishopcolumn}`
            );
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
            bishopcolumn--;
            bishoprow--;
          }
        } else if (targetrow > selectrow && targetcolumn > selectcolumn) {
          bishopcolumn = selectcolumn + 1;
          bishoprow = selectrow + 1;
          while (bishoprow < targetrow) {
            checkdom = document.getElementById(
              `gamecell${bishoprow}${bishopcolumn}`
            );
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
            bishopcolumn++;
            bishoprow++;
          }
        } else if (targetrow > selectrow && targetcolumn < selectcolumn) {
          bishopcolumn = selectcolumn - 1;
          bishoprow = selectrow + 1;
          while (bishoprow < targetrow) {
            checkdom = document.getElementById(
              `gamecell${bishoprow}${bishopcolumn}`
            );
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
            bishopcolumn--;
            bishoprow++;
          }
        }

        if (count === 0) {
          replacePiece(
            selectdom,
            selectpiece,
            selectrow,
            selectcolumn,
            targetdom,
            targetrow,
            targetcolumn,
            board
          );
          count = 0;
        }
      }
      break;

    //白主教
    case 4:
      if (
        Math.abs((targetcolumn - selectcolumn) / (targetrow - selectrow)) ===
          1 &&
        targetpiece <= 0
      ) {
        if (targetrow < selectrow && targetcolumn > selectcolumn) {
          bishopcolumn = selectcolumn + 1;
          bishoprow = selectrow - 1;
          while (bishoprow > targetrow) {
            checkdom = document.getElementById(
              `gamecell${bishoprow}${bishopcolumn}`
            );
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
            bishopcolumn++;
            bishoprow--;
          }
        } else if (targetrow < selectrow && targetcolumn < selectcolumn) {
          bishopcolumn = selectcolumn - 1;
          bishoprow = selectrow - 1;
          while (bishoprow > targetrow) {
            checkdom = document.getElementById(
              `gamecell${bishoprow}${bishopcolumn}`
            );
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
            bishopcolumn--;
            bishoprow--;
          }
        } else if (targetrow > selectrow && targetcolumn > selectcolumn) {
          bishopcolumn = selectcolumn + 1;
          bishoprow = selectrow + 1;
          while (bishoprow < targetrow) {
            checkdom = document.getElementById(
              `gamecell${bishoprow}${bishopcolumn}`
            );
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
            bishopcolumn++;
            bishoprow++;
          }
        } else if (targetrow > selectrow && targetcolumn < selectcolumn) {
          bishopcolumn = selectcolumn - 1;
          bishoprow = selectrow + 1;
          while (bishoprow < targetrow) {
            checkdom = document.getElementById(
              `gamecell${bishoprow}${bishopcolumn}`
            );
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
            bishopcolumn--;
            bishoprow++;
          }
        }

        if (count === 0) {
          replacePiece(
            selectdom,
            selectpiece,
            selectrow,
            selectcolumn,
            targetdom,
            targetrow,
            targetcolumn,
            board
          );
          count = 0;
        }
      }

      break;

    //黑皇后
    case -5:
      if (
        Math.abs((targetcolumn - selectcolumn) / (targetrow - selectrow)) ===
          1 &&
        targetpiece >= 0
      ) {
        if (targetrow < selectrow && targetcolumn > selectcolumn) {
          bishopcolumn = selectcolumn + 1;
          bishoprow = selectrow - 1;
          while (bishoprow > targetrow) {
            checkdom = document.getElementById(
              `gamecell${bishoprow}${bishopcolumn}`
            );
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
            bishopcolumn++;
            bishoprow--;
          }
        } else if (targetrow < selectrow && targetcolumn < selectcolumn) {
          bishopcolumn = selectcolumn - 1;
          bishoprow = selectrow - 1;
          while (bishoprow > targetrow) {
            checkdom = document.getElementById(
              `gamecell${bishoprow}${bishopcolumn}`
            );
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
            bishopcolumn--;
            bishoprow--;
          }
        } else if (targetrow > selectrow && targetcolumn > selectcolumn) {
          bishopcolumn = selectcolumn + 1;
          bishoprow = selectrow + 1;
          while (bishoprow < targetrow) {
            checkdom = document.getElementById(
              `gamecell${bishoprow}${bishopcolumn}`
            );
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
            bishopcolumn++;
            bishoprow++;
          }
        } else if (targetrow > selectrow && targetcolumn < selectcolumn) {
          bishopcolumn = selectcolumn - 1;
          bishoprow = selectrow + 1;
          while (bishoprow < targetrow) {
            checkdom = document.getElementById(
              `gamecell${bishoprow}${bishopcolumn}`
            );
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
            bishopcolumn--;
            bishoprow++;
          }
        }

        if (count === 0) {
          replacePiece(
            selectdom,
            selectpiece,
            selectrow,
            selectcolumn,
            targetdom,
            targetrow,
            targetcolumn,
            board
          );
          count = 0;
        }
      }

      if (
        (Math.abs(targetcolumn - selectcolumn) === 0 ||
          Math.abs(targetrow - selectrow) === 0) &&
        targetpiece >= 0
      ) {
        if (targetrow > selectrow) {
          for (let i = selectrow + 1; i < targetrow; i++) {
            checkdom = document.getElementById(`gamecell${i}${targetcolumn}`);
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
          }
        } else if (targetrow < selectrow) {
          for (let i = targetrow + 1; i < selectrow; i++) {
            checkdom = document.getElementById(`gamecell${i}${targetcolumn}`);

            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
          }
        } else if (targetcolumn > selectcolumn) {
          for (let i = selectcolumn + 1; i < targetcolumn; i++) {
            checkdom = document.getElementById(`gamecell${targetrow}${i}`);
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
          }
        } else if (targetcolumn < selectcolumn) {
          for (let i = targetcolumn + 1; i < selectcolumn; i++) {
            checkdom = document.getElementById(`gamecell${targetrow}${i}`);
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
          }
        }

        if (count === 0) {
          replacePiece(
            selectdom,
            selectpiece,
            selectrow,
            selectcolumn,
            targetdom,
            targetrow,
            targetcolumn,
            board
          );
          count = 0;
        }
      }

      break;

    //白皇后
    case 5:
      if (
        Math.abs((targetcolumn - selectcolumn) / (targetrow - selectrow)) ===
          1 &&
        targetpiece <= 0
      ) {
        if (targetrow < selectrow && targetcolumn > selectcolumn) {
          bishopcolumn = selectcolumn + 1;
          bishoprow = selectrow - 1;
          while (bishoprow > targetrow) {
            checkdom = document.getElementById(
              `gamecell${bishoprow}${bishopcolumn}`
            );
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
            bishopcolumn++;
            bishoprow--;
          }
        } else if (targetrow < selectrow && targetcolumn < selectcolumn) {
          bishopcolumn = selectcolumn - 1;
          bishoprow = selectrow - 1;
          while (bishoprow > targetrow) {
            checkdom = document.getElementById(
              `gamecell${bishoprow}${bishopcolumn}`
            );
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
            bishopcolumn--;
            bishoprow--;
          }
        } else if (targetrow > selectrow && targetcolumn > selectcolumn) {
          bishopcolumn = selectcolumn + 1;
          bishoprow = selectrow + 1;
          while (bishoprow < targetrow) {
            checkdom = document.getElementById(
              `gamecell${bishoprow}${bishopcolumn}`
            );
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
            bishopcolumn++;
            bishoprow++;
          }
        } else if (targetrow > selectrow && targetcolumn < selectcolumn) {
          bishopcolumn = selectcolumn - 1;
          bishoprow = selectrow + 1;
          while (bishoprow < targetrow) {
            checkdom = document.getElementById(
              `gamecell${bishoprow}${bishopcolumn}`
            );
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
            bishopcolumn--;
            bishoprow++;
          }
        }

        if (count === 0) {
          replacePiece(
            selectdom,
            selectpiece,
            selectrow,
            selectcolumn,
            targetdom,
            targetrow,
            targetcolumn,
            board
          );
          count = 0;
        }
      }

      if (
        (Math.abs(targetcolumn - selectcolumn) === 0 ||
          Math.abs(targetrow - selectrow) === 0) &&
        targetpiece <= 0
      ) {
        if (targetrow > selectrow) {
          for (let i = selectrow + 1; i < targetrow; i++) {
            checkdom = document.getElementById(`gamecell${i}${targetcolumn}`);
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
          }
        } else if (targetrow < selectrow) {
          for (let i = targetrow + 1; i < selectrow; i++) {
            checkdom = document.getElementById(`gamecell${i}${targetcolumn}`);

            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
          }
        } else if (targetcolumn > selectcolumn) {
          for (let i = selectcolumn + 1; i < targetcolumn; i++) {
            checkdom = document.getElementById(`gamecell${targetrow}${i}`);
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
          }
        } else if (targetcolumn < selectcolumn) {
          for (let i = targetcolumn + 1; i < selectcolumn; i++) {
            checkdom = document.getElementById(`gamecell${targetrow}${i}`);
            if (parseInt(checkdom.getAttribute("piece")) !== 0) {
              count++;
            }
          }
        }

        if (count === 0) {
          replacePiece(
            selectdom,
            selectpiece,
            selectrow,
            selectcolumn,
            targetdom,
            targetrow,
            targetcolumn,
            board
          );
          count = 0;
        }
      }
      break;
    //黑國王
    case -6:
      if (
        targetrow === 0 &&
        targetcolumn === 2 &&
        selectrow === 0 &&
        selectcolumn === 4 &&
        board[0][0] === -2 &&
        targetpiece >= 0 &&
        board[0][1] === 0 &&
        board[0][2] === 0 &&
        board[0][3] === 0
      ) {
        replacePiece(
          selectdom,
          selectpiece,
          selectrow,
          selectcolumn,
          targetdom,
          targetrow,
          targetcolumn,
          board
        );
        KingCastleMove(-2, 0, 0, 0, 3, board, roomName);
      }

      if (
        targetrow === 0 &&
        targetcolumn === 6 &&
        selectrow === 0 &&
        selectcolumn === 4 &&
        board[0][7] === -2 &&
        targetpiece >= 0 &&
        board[0][6] === 0 &&
        board[0][5] === 0
      ) {
        replacePiece(
          selectdom,
          selectpiece,
          selectrow,
          selectcolumn,
          targetdom,
          targetrow,
          targetcolumn,
          board
        );
        KingCastleMove(-2, 0, 7, 0, 5, board, roomName);
      }

      if (
        Math.abs((targetcolumn - selectcolumn) / (targetrow - selectrow)) ===
          1 &&
        targetpiece >= 0 &&
        Math.abs(targetrow - selectrow) === 1 &&
        Math.abs(targetcolumn - selectcolumn) === 1
      ) {
        replacePiece(
          selectdom,
          selectpiece,
          selectrow,
          selectcolumn,
          targetdom,
          targetrow,
          targetcolumn,
          board
        );
      }

      if (
        (Math.abs(targetcolumn - selectcolumn) === 0 &&
          Math.abs(targetrow - selectrow) === 1) ||
        (Math.abs(targetrow - selectrow) === 0 &&
          Math.abs(targetcolumn - selectcolumn) === 1)
      ) {
        if (targetpiece >= 0) {
          replacePiece(
            selectdom,
            selectpiece,
            selectrow,
            selectcolumn,
            targetdom,
            targetrow,
            targetcolumn,
            board
          );
        }
      }

      break;

    //白國王
    case 6:
      if (
        targetrow === 7 &&
        targetcolumn === 6 &&
        selectrow === 7 &&
        selectcolumn === 4 &&
        board[7][7] === 2 &&
        targetpiece <= 0 &&
        board[7][6] === 0 &&
        board[7][5] === 0
      ) {
        replacePiece(
          selectdom,
          selectpiece,
          selectrow,
          selectcolumn,
          targetdom,
          targetrow,
          targetcolumn,
          board
        );
        KingCastleMove(2, 7, 7, 7, 5, board, roomName);
      }

      if (
        targetrow === 7 &&
        targetcolumn === 2 &&
        selectrow === 7 &&
        selectcolumn === 4 &&
        board[7][0] === 2 &&
        targetpiece <= 0 &&
        board[7][1] === 0 &&
        board[7][2] === 0 &&
        board[7][3] === 0
      ) {
        replacePiece(
          selectdom,
          selectpiece,
          selectrow,
          selectcolumn,
          targetdom,
          targetrow,
          targetcolumn,
          board
        );
        KingCastleMove(2, 7, 0, 7, 3, board, roomName);
      }

      if (
        Math.abs((targetcolumn - selectcolumn) / (targetrow - selectrow)) ===
          1 &&
        targetpiece <= 0 &&
        Math.abs(targetrow - selectrow) === 1 &&
        Math.abs(targetcolumn - selectcolumn) === 1
      ) {
        replacePiece(
          selectdom,
          selectpiece,
          selectrow,
          selectcolumn,
          targetdom,
          targetrow,
          targetcolumn,
          board
        );
      }

      if (
        (Math.abs(targetcolumn - selectcolumn) === 0 &&
          Math.abs(targetrow - selectrow) === 1) ||
        (Math.abs(targetrow - selectrow) === 0 &&
          Math.abs(targetcolumn - selectcolumn) === 1)
      ) {
        if (targetpiece <= 0) {
          replacePiece(
            selectdom,
            selectpiece,
            selectrow,
            selectcolumn,
            targetdom,
            targetrow,
            targetcolumn,
            board
          );
        }
      }

      break;
  }
}

function replacePiece(
  selectdom,
  selectpiece,
  selectrow,
  selectcolumn,
  targetdom,
  targetrow,
  targetcolumn,
  board
) {
  targetdom.setAttribute("piece", selectpiece);
  selectdom.setAttribute("piece", 0);
  board[targetrow][targetcolumn] = parseInt(selectpiece);
  board[selectrow][selectcolumn] = 0;
}

function blackPawnButton(pawnButton, board, targetrow, targetcolumn, roomName) {
  var pawnBut = document.getElementById(pawnButton);

  var buttonQueen = document.createElement("button");
  var buttonKnight = document.createElement("button");
  var buttonBishop = document.createElement("button");
  var buttonCastle = document.createElement("button");

  buttonQueen.innerHTML =
    "<div style='font-size:60px;text-align:center;'>&#x265B;</div>";
  buttonKnight.innerHTML =
    "<div style='font-size:60px;text-align:center;'>&#x265E;</div>";
  buttonBishop.innerHTML =
    "<div style='font-size:60px;text-align:center;'>&#x265D;</div>";
  buttonCastle.innerHTML =
    "<div style='font-size:60px;text-align:center;'>&#x265C;</div>";

  pawnBut.appendChild(buttonQueen);
  pawnBut.appendChild(buttonKnight);
  pawnBut.appendChild(buttonBishop);
  pawnBut.appendChild(buttonCastle);

  buttonQueen.addEventListener("click", () => {
    var dom = document.getElementById(`gamecell${targetrow}${targetcolumn}`);

    board[targetrow][targetcolumn] = -5;
    dom.setAttribute("piece", -5);
    piece.drawPieceAtBoard(board, targetrow, targetcolumn);

    socket.emit("pawnChange", {
      targetrow: targetrow,
      targetcolumn: targetcolumn,
      board: board,
      piece: -5,
      room: roomName
    });

    while (pawnBut.childNodes[0]) {
      pawnBut.removeChild(pawnBut.childNodes[0]);
    }
  });
  buttonKnight.addEventListener("click", () => {
    var dom = document.getElementById(`gamecell${targetrow}${targetcolumn}`);

    board[targetrow][targetcolumn] = -3;
    dom.setAttribute("piece", -3);
    piece.drawPieceAtBoard(board, targetrow, targetcolumn);

    socket.emit("pawnChange", {
      targetrow: targetrow,
      targetcolumn: targetcolumn,
      board: board,
      piece: -3,
      room: roomName
    });

    while (pawnBut.childNodes[0]) {
      pawnBut.removeChild(pawnBut.childNodes[0]);
    }
  });
  buttonBishop.addEventListener("click", () => {
    var dom = document.getElementById(`gamecell${targetrow}${targetcolumn}`);

    board[targetrow][targetcolumn] = -4;
    dom.setAttribute("piece", -4);
    piece.drawPieceAtBoard(board, targetrow, targetcolumn);

    socket.emit("pawnChange", {
      targetrow: targetrow,
      targetcolumn: targetcolumn,
      board: board,
      piece: -4,
      room: roomName
    });

    while (pawnBut.childNodes[0]) {
      pawnBut.removeChild(pawnBut.childNodes[0]);
    }
  });
  buttonCastle.addEventListener("click", () => {
    var dom = document.getElementById(`gamecell${targetrow}${targetcolumn}`);

    board[targetrow][targetcolumn] = -2;
    dom.setAttribute("piece", -2);
    piece.drawPieceAtBoard(board, targetrow, targetcolumn);

    socket.emit("pawnChange", {
      targetrow: targetrow,
      targetcolumn: targetcolumn,
      board: board,
      piece: -2,
      room: roomName
    });
    while (pawnBut.childNodes[0]) {
      pawnBut.removeChild(pawnBut.childNodes[0]);
    }
  });
}

function whitePawnButton(pawnButton, board, targetrow, targetcolumn, roomName) {
  var pawnBut = document.getElementById(pawnButton);

  var buttonQueen = document.createElement("button");
  var buttonKnight = document.createElement("button");
  var buttonBishop = document.createElement("button");
  var buttonCastle = document.createElement("button");

  buttonQueen.innerHTML =
    "<div style='font-size:60px;text-align:center;'>&#x2655;</div>";
  buttonKnight.innerHTML =
    "<div style='font-size:60px;text-align:center;'>&#x2658;</div>";
  buttonBishop.innerHTML =
    "<div style='font-size:60px;text-align:center;'>&#x2657;</div>";
  buttonCastle.innerHTML =
    "<div style='font-size:60px;text-align:center;'>&#x2656;</div>";

  pawnBut.appendChild(buttonQueen);
  pawnBut.appendChild(buttonKnight);
  pawnBut.appendChild(buttonBishop);
  pawnBut.appendChild(buttonCastle);

  buttonQueen.addEventListener("click", () => {
    var dom = document.getElementById(`gamecell${targetrow}${targetcolumn}`);

    board[targetrow][targetcolumn] = 5;
    dom.setAttribute("piece", 5);
    piece.drawPieceAtBoard(board, targetrow, targetcolumn);

    socket.emit("pawnChange", {
      targetrow: targetrow,
      targetcolumn: targetcolumn,
      board: board,
      piece: 5,
      room: roomName
    });

    while (pawnBut.childNodes[0]) {
      pawnBut.removeChild(pawnBut.childNodes[0]);
    }
  });
  buttonKnight.addEventListener("click", () => {
    var dom = document.getElementById(`gamecell${targetrow}${targetcolumn}`);

    board[targetrow][targetcolumn] = 3;
    dom.setAttribute("piece", 3);
    piece.drawPieceAtBoard(board, targetrow, targetcolumn);

    socket.emit("pawnChange", {
      targetrow: targetrow,
      targetcolumn: targetcolumn,
      board: board,
      piece: 3,
      room: roomName
    });
    while (pawnBut.childNodes[0]) {
      pawnBut.removeChild(pawnBut.childNodes[0]);
    }
  });
  buttonBishop.addEventListener("click", () => {
    var dom = document.getElementById(`gamecell${targetrow}${targetcolumn}`);

    board[targetrow][targetcolumn] = 4;
    dom.setAttribute("piece", 4);
    piece.drawPieceAtBoard(board, targetrow, targetcolumn);

    socket.emit("pawnChange", {
      targetrow: targetrow,
      targetcolumn: targetcolumn,
      board: board,
      piece: 4,
      room: roomName
    });
    while (pawnBut.childNodes[0]) {
      pawnBut.removeChild(pawnBut.childNodes[0]);
    }
  });
  buttonCastle.addEventListener("click", () => {
    var dom = document.getElementById(`gamecell${targetrow}${targetcolumn}`);

    board[targetrow][targetcolumn] = 2;
    dom.setAttribute("piece", 2);
    piece.drawPieceAtBoard(board, targetrow, targetcolumn);

    socket.emit("pawnChange", {
      targetrow: targetrow,
      targetcolumn: targetcolumn,
      board: board,
      piece: 2,
      room: roomName
    });
    while (pawnBut.childNodes[0]) {
      pawnBut.removeChild(pawnBut.childNodes[0]);
    }
  });
}

function KingCastleMove(
  Castlepiece,
  selectrow,
  selectcolumn,
  targetrow,
  targetcolumn,
  board,
  roomName
) {
  var castledom = document.getElementById(
    `gamecell${selectrow}${selectcolumn}`
  );
  var castletargetdom = document.getElementById(
    `gamecell${targetrow}${targetcolumn}`
  );

  castletargetdom.setAttribute("piece", Castlepiece);
  castledom.setAttribute("piece", 0);
  board[targetrow][targetcolumn] = Castlepiece;
  board[selectrow][selectcolumn] = 0;

  piece.drawPieceAtBoard(board, selectrow, selectcolumn);
  piece.drawPieceAtBoard(board, targetrow, targetcolumn);

  socket.emit(
    "boardRecord",
    board,
    selectrow,
    selectcolumn,
    castledom,
    Castlepiece,
    targetrow,
    targetcolumn,
    castletargetdom,
    0,
    roomName
  );
}

module.exports = { movePiece: movePiece };
