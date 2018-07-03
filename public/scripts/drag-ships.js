$(document).ready(function(){
  let shipLengths = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2
  }

  let $dragged;
  let shipNumber;
  let shipLength;
  let shipName;


  // when ship is double clicked, it rotates 90 deg
  $(".all-ships .ship").dblclick(function(ev) {
    $(this).toggleClass("vertical-ship");
  });

  $(".ship-box").on("mousedown", function (event) {
    shipNumber = $(this).attr("data-index");
    $(".all-ships .ship").on("dragstart", function (event) {
      $dragged = $(this);
      shipLength = shipLengths[$(this).attr("data-shipname")];
      shipName = $(this).attr("data-shipname");
    });

  })

  $(".all-ships .ship").on("dragend", function (event) {
    $dragged = null;
    shipLength = null;
    shipNumber = null;
  });

  $(".box.grey-box").on("dragover", function (event) {
    event.preventDefault();
  });

  // making choices
  $(".box.grey-box").on("drop", function (event) {
    let xPos = $(this).attr("data-x");
    let yPos = $(this).attr("data-y");
    let errors = 0;
    //$(this).removeClass("grey-box").addClass(shipName);
    if (!$dragged.hasClass("vertical-ship")) {
      let startx = xPos - shipNumber;
      let starty = yPos;
      if (startx < 0 || startx+shipLength > 10) {
      } else {
        for (let i = startx; i < (startx + shipLength); i ++ ) {
          if (!$(`.my-grid .box[data-x=${i.toString()}][data-y=${starty.toString()}]`).hasClass("grey-box")) {
            errors += 1;
          }
        }
        if (errors === 0) {
          for (let i = startx; i < (startx + shipLength); i ++ ) {
            $(`.my-grid .box[data-x=${i.toString()}][data-y=${starty.toString()}]`)
              .removeClass("grey-box")
              .addClass(shipName);
            $dragged.addClass("hidden");
          }
        }
      }
    } else {
      let startx = xPos;
      let starty = yPos - shipNumber;
      if (starty < 0 || starty+shipLength > 10) {
      } else {
        for (let i = starty; i < (starty + shipLength); i ++ ) {
          if (!$(`.my-grid .box[data-x=${startx.toString()}][data-y=${i.toString()}]`).hasClass("grey-box")) {
            errors += 1;
          }
        }
        if (errors === 0)   {
          for (let i = starty; i <(starty + shipLength); i ++ ) {
            $(`.my-grid .box[data-x=${startx.toString()}][data-y=${i.toString()}]`)
              .removeClass("grey-box")
              .addClass(shipName);
            $dragged.addClass("hidden");
          }
        }
      }
    }
  });

  $(".all-ships .reset-ships").on("click", function(event) {
    $(".my-grid").children(".row").each(function () {
      $(this).children(".box").each(function () {
        if (!$(this).hasClass("grey-box")) {
          $(this).removeClass().addClass("box").addClass("grey-box");
        }
      })
    });
    $(".all-ships .ship").each(function () {
      $(this).removeClass("hidden").removeClass("vertical-ship");
      $(".all-ships .place-ship-errors").empty();
    })
  })



});