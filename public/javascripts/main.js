function smileyBtnClicked(req, res, body) {
    $.ajax({
        url: "/worry",
        method: "POST",
        data: { id: "hello"},
      }).done(function(response) {
        // dont kill me
        $('body').replaceWith(response);
      }).fail(function( error ) {
        console.log(error);
      });
}