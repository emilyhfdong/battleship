$(document).ready(function(){
  let shipLengths = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2
  }
  //function to create a 10 x 10 grid
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

  function createRowLabels(gridClass) {
    let i = 1;
    $(gridClass).children('.row').each(function () {
      $rowLabel = $(`<div class='box label'>${i}</div>`);
      $(this).prepend($rowLabel);
      i += 1;
    });
  }

  function createColumnLabels(gridClass) {
    let $columnLabels = $(`<div class='row columnLabels'><div class='box label'></div></div>`);
    let letters = "ABCDEFGHIJ";
    for (let i = 0; i < 10; i ++ ) {
      $label = $(`<div class='box label'>${letters[i]}</div>`);
      $columnLabels.append($label);
    }
    $(`${gridClass} .container-name`).after($columnLabels);
  }


  // function to make ships
  function makeShips (shipName) {
    let $box = $("<div class='box ship-box'></div>");
    let $ship = $("<div class='ship' draggable='true'></div>");
    for (let i = 0; i < shipLengths[shipName]; i ++ ) {
      $ship.append($box.clone().addClass(shipName).attr("data-index", i)).attr("data-shipName", shipName);
    }
    return $ship;
  }
  // function to load ships in the ships container
  function loadShips () {
    for (ship in shipLengths) {
      $(".grid-container .all-ships").append(makeShips(ship));
    }
  }
  //create my grid, enemy grid and load ships
  createGrid(".my-grid");
  createRowLabels(".my-grid");
  createColumnLabels(".my-grid");
  createGrid(".enemy-grid");
  createRowLabels(".enemy-grid");
  createColumnLabels(".enemy-grid");
  loadShips();


});