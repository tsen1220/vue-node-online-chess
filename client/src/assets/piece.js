function drawPieceAtBoard(list, row, column) {
  var Domelement = document.getElementById(`gamecell${row}${column}`);
  row = parseInt(row);
  column = parseInt(column);
  switch (list[row][column]) {
    case -1:
      Domelement.innerHTML = `<div style='font-size:60px;text-align:center;' >&#x265F;</div>`;
      break;
    case -2:
      Domelement.innerHTML = `<div style='font-size:60px;text-align:center;' >&#x265C;</div>
         `;
      break;
    case -3:
      Domelement.innerHTML = `<div style='font-size:60px;text-align:center;' >&#x265E;</div>
               `;
      break;
    case -4:
      Domelement.innerHTML = `<div style='font-size:60px;text-align:center;' >&#x265D;</div>
               `;
      break;
    case -5:
      Domelement.innerHTML = `<div style='font-size:60px;text-align:center;' >&#x265B;</div>
               `;
      break;
    case -6:
      Domelement.innerHTML = `<div style='font-size:60px;text-align:center;' >&#x265A;</div>
                       `;
      break;
    case 1:
      Domelement.innerHTML = `<div style='font-size:60px;text-align:center;' >&#x2659;</div>`;
      break;
    case 2:
      Domelement.innerHTML = `<div style='font-size:60px;text-align:center;' >&#x2656;</div>
               `;
      break;
    case 3:
      Domelement.innerHTML = `<div style='font-size:60px;text-align:center;' >&#x2658;</div>
                     `;
      break;
    case 4:
      Domelement.innerHTML = `<div style='font-size:60px;text-align:center;' >&#x2657;</div>
                     `;
      break;
    case 5:
      Domelement.innerHTML = `<div style='font-size:60px;text-align:center;' >&#x2655;</div>
                     `;
      break;
    case 6:
      Domelement.innerHTML = `<div style='font-size:60px;text-align:center;' >&#x2654;</div>
                             `;
      break;
    case 0:
      Domelement.innerHTML = `<div style='font-size:60px;text-align:center;' ></div>`;
  }
}

module.exports = { drawPieceAtBoard: drawPieceAtBoard };
