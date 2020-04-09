function smileyBtnClicked(req, res, body) {
    $.ajax({
        url: "/",
        method: "POST",
        data: { id: "hello"},
      }).done(function(response) {
        console.log(response);
      }).fail(function( error ) {
        console.log(error);
      });
}