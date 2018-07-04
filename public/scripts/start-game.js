$(document).ready(function(){

  $("header .start-game").on("click", function(ev) {
    $(".all-ships .place-ship-errors").empty();
    let errors = 0;
    $(".all-ships .ship").each(function () {
      if (!$(this).hasClass("hidden")) {
        errors += 1;
      }
    });
    if (errors !== 0) {
      $(".all-ships .place-ship-errors").append("<p>please place all ships first!</p>")
    } else {
      $(".grid-container .enemy-grid").removeClass("hidden");
      $(".grid-container .all-ships").addClass("hidden");
      $(".instructions").removeClass("hidden");
      $(".ship-lists").removeClass("hidden");
    }
  });

});