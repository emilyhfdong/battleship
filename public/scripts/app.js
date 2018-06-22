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
      let $row = $(`<div class='row yVal${i}'></div>`);
      for (let j = 0; j < 10; j ++ ) {
        $row.append($box.clone().addClass(`xVal${j}`));
      }
      $(gridClass).append($row)
    }
  }

  createGrid(".my-grid");
  createGrid(".enemy-grid");

  function makeShips (shipName) {
    let $box = $("<div class='box'></div>");
    let $ship = $(`<div class='ship'></div>`);
    for (let i = 0; i < shipLengths[shipName]; i ++ ) {
      $ship.append($box.clone().addClass(shipName));
    }

    return $ship;
  }

  function loadShips () {
    for (ship in shipLengths) {
      $(".grid-container .all-ships").append(makeShips(ship));
    }
  }

  loadShips();

  $(".all-ships .ship").dblclick(function(ev) {
    $(this).toggleClass("vertical-ship");
  });


  $("header .start-game").on("click", function(ev) {
    $(".grid-container .enemy-grid").removeClass("hidden");
    $(".grid-container .all-ships").addClass("hidden");
  });

  $("header .new-game").on("click", function(ev) {
    $(".grid-container .enemy-grid").addClass("hidden");
    $(".grid-container .all-ships").removeClass("hidden");
  });


});


