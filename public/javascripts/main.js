function smileyBtnClicked(req, res, body) {
    $.ajax({
        url: "/",
        method: "POST",
        data: { id: "hello"},
      }).done(function(response) {
        window.location.href = '/worry';
        // dont kill me
        //$('body').replaceWith(response);
      }).fail(function( error ) {
        console.log(error);
      });
}