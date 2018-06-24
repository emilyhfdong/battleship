$(document).ready(function(){
  let shipLengths = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2
  }


  function createGrid(gridClass) {
    let $box = $("<div class='box grey-box'></div>");

    for (let i = 0; i < 10; i ++ ) {
      let $row = $(`<div class='row'></div>`);
      for (let j = 0; j < 10; j ++ ) {
        $row.append($box.clone().attr("data-x", j).attr("data-y", i));
      }
      $(gridClass).append($row)
    }
  }

  createGrid(".my-grid");
  createGrid(".enemy-grid");



  function makeShips (shipName) {
    let $box = $("<div class='box'></div>");
    let $ship = $(`
      <div class='ship'>
        <textarea class="xPos" placeholder="x"></textarea>
        <textarea class="yPos" placeholder="y"></textarea>
        <button class="go">
          <p>place ship</p>
        </button>
      </div>`);
    for (let i = 0; i < shipLengths[shipName]; i ++ ) {
      $ship.append($box.clone().addClass(shipName)).attr("shipName", shipName);
    }


    return $ship;
  }

  function loadShips () {
    for (ship in shipLengths) {
      $errors = $("<div class='errors'></div>")
      $(".grid-container .all-ships").append(makeShips(ship)).append($errors);
    }
  }

  loadShips();

  // when ship is double clicked, it rotates 90 deg
  $(".all-ships .ship").dblclick(function(ev) {
    $(this).toggleClass("vertical-ship");
  });

  // when START GAME is clicked, enemgy grid appears and all-ships disappears
  $("header .start-game").on("click", function(ev) {
    $(".grid-container .enemy-grid").removeClass("hidden");
    $(".grid-container .all-ships").addClass("hidden");
  });

  // when NEW GAME is clicked, enemy grid disappears and all-ships appears
  $("header .new-game").on("click", function(ev) {
    $(".grid-container .enemy-grid").addClass("hidden");
    $(".grid-container .all-ships").removeClass("hidden");
  });

  // when a position is inputted...
  $(".ship .go").on("click", function () {
    let $goButton = $(this);
    let $ship = $goButton.parent();
    let shipName = $ship.attr("shipName")
    let $errors = $goButton.parent().next();
    let numberOfErrors = 0;

    $errors.empty();

    let xPosition = $goButton.siblings('.xPos').val();
    let yPosition = $goButton.siblings('.yPos').val();

    if (yPosition.toString() === "") {
      $errors.append("<p>please input a y position</p>");
      numberOfErrors += 1;
    }
    if (xPosition.toString() === "") {
      $errors.append("<p>please input a x position</p>");
      numberOfErrors += 1;
    }
    if ($ship.hasClass("vertical-ship")) {
      if ((Number(yPosition) + shipLengths[shipName]) > 9 ) {
        for (let i = 0; i < (10 - Number(yPosition)); i ++ ) {
          $(`.grid [data-x="${Number(xPosition)}"][data-y="${Number(yPosition) + i}"]`).addClass(`${shipName} lighter`);
        }
        $errors.append("<p>ship does not fit</p>");
        numberOfErrors += 1;
      }
    } else {
      if ((Number(xPosition) + shipLengths[shipName]) > 9 ) {
        for (let i = 0; i < (10 - Number(xPosition)); i ++ ) {
          $(`.grid [data-x="${Number(xPosition) + i}"][data-y="${Number(yPosition)}"]`).addClass(`${shipName} lighter`);
        }
        $errors.append("<p>ship does not fit</p>");
        numberOfErrors += 1;
      }
    }

    if (numberOfErrors === 0) {
      $ship.remove();
      if ($ship.hasClass("vertical-ship")) {
        for (let i = 0; i < shipLengths[shipName]; i ++ ) {
          $(`.grid [data-x="${Number(xPosition)}"][data-y="${Number(yPosition) + i}"]`).addClass(shipName);
        }
      } else {
        for (let i = 0; i < shipLengths[shipName]; i ++ ) {
          $(`.grid [data-x="${Number(xPosition) + i}"][data-y="${Number(yPosition)}"]`).addClass(shipName);
        }
      }
    }

  });

});


