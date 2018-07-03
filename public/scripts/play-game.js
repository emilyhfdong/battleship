let enemyShipGrid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let shipLengths = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2
}

let alreadyShot = [];

function aiPlaceOneBoat (shipName) {
  let startX = Math.floor(Math.random() * 10);
  let startY = Math.floor(Math.random() * 10);
  let orientation = Math.round(Math.random());
  let errors = 0;

  if (orientation === 0) {
    orientation = "vertical";
    while ((startY + shipLengths[shipName]) > 10) {
      startY = Math.floor(Math.random() * 10);
    }
    for (let i = 0; i < shipLengths[shipName]; i ++ ) {
      if (enemyShipGrid[startY + i][startX] !== 0) {
        aiPlaceOneBoat(shipName);
        return;
      }
    }
    for (let i = 0; i < shipLengths[shipName]; i ++) {
      enemyShipGrid[startY + i][startX] = shipName;
    }
    return enemyShipGrid;

  } else {
    orientation = "horizontal";
    while ((startX + shipLengths[shipName]) > 10) {
      startX = Math.floor(Math.random() * 10);
    }
    for (let i = 0; i < shipLengths[shipName]; i ++ ) {
      if (enemyShipGrid[startY][startX + i] !== 0) {
        aiPlaceOneBoat(shipName);
        return;
      }
    }
    for (let i = 0; i < shipLengths[shipName]; i ++) {
      enemyShipGrid[startY][startX + i] = shipName;
    }
    return enemyShipGrid;
  }
}
function placeAIBoats () {
  for (ship in shipLengths) {
    aiPlaceOneBoat(ship);
  }
}
$(document).ready(function(){
  placeAIBoats();
  console.log(enemyShipGrid);

  $(".enemy-grid .grey-box").on("click", function (event) {
    xPos = $(this).attr("data-x");
    yPos = $(this).attr("data-y");
    let $targetBox = $(this)
    if (enemyShipGrid[yPos][xPos] === 0) {
      $targetBox.removeClass("grey-box").addClass("miss-box");
    } else {
      $targetBox.removeClass("grey-box").addClass("hit-box");
    }
    let $enemyTargetBox;
    function enemyShot () {
      let enemyShotxPos = Math.floor(Math.random() * 10);
      let enemyShotyPos = Math.floor(Math.random() * 10);
      let targetCoords = `${enemyShotxPos.toString()}, ${enemyShotyPos.toString()}`;
      if (!alreadyShot.includes(targetCoords)) {
        alreadyShot.push(targetCoords);
        $enemyTargetBox = $(`.my-grid .box[data-x=${enemyShotxPos.toString()}][data-y=${enemyShotyPos.toString()}]`);
      } else {
        enemyShot();
      }
    }
    enemyShot();
    console.log(alreadyShot);

    if ($enemyTargetBox.hasClass("grey-box")) {
      $enemyTargetBox.append("<p>o</p>");
    } else {
      $enemyTargetBox.append("<p>x</p>");
    }

  })


})









