function smileyBtnClicked(req, res, body) {
    // get current date
    // get date/time smiley clicked
    // get start end smiley

    $.ajax({
        url: "/",
        method: "POST",
        data: { smiley_number: "1", is_start_smiley: true, is_end_smiley: true},
      }).done(function(response) {
        //window.location.href = '/worry';
        // dont kill me
        $('body').replaceWith(response);
      }).fail(function( error ) {
        console.log(error);
      });
}

function worryFormSubmit() {
    var worryText = $('#worry-form').elements['worry-text-input'];
}