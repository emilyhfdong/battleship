let shipLengths = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2
}
let myGrid = [
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

let enemyHitGrid = [
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


function placeMyBoats (startX, startY, shipLength, orientation) {
  if (orientation === "horizontal") {
    if ((startX + shipLength) > 10 ){
      return "error";
    }
    for (let i = 0; i < shipLength; i ++ ) {
      myGrid[startY][startX + i] = "ship";
    }

  } else if (orientation === "vertical"){
    if ((startY + shipLength) > 10) {
      return "error";
    }
    for (let i = 0; i < shipLength; i ++ ) {
      myGrid[startY + i][startX] = "ship";
    }

  } else {
    return "error";
  }

  return myGrid;
}

function myShot (xPosition, yPosition) {
  if (enemyShipGrid[yPosition][xPosition] === 0) {
    enemyHitGrid[yPosition][xPosition] = "miss";
  } else {
    enemyHitGrid[yPosition][xPosition] = "hit";
  }
}



function enemyShot () {
  let xPosition = Math.floor(Math.random() * 10);
  let yPosition = Math.floor(Math.random() * 10);

  if (myGrid[yPosition][xPosition] === 0) {
    myGrid[yPosition][xPosition] = "miss";
    return myGrid;
  } else if (myGrid[yPosition][xPosition] === "ship") {
    myGrid[yPosition][xPosition] = "HIT";
    return myGrid;
  } else {
    enemyShot();
  }
}

module.exports = {
  placeAIBoats: placeAIBoats,
  placeMyBoats: placeMyBoats,
  myShot: myShot,
  enemyShot: enemyShot,
}
