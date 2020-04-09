function smileyBtnClicked(smileyNumber) {

    console.log(smileyNumber)

    let dataToSend = {};
    dataToSend['startTime'] = getCurrentTime();

    $.ajax({
        url: "/",
        method: "POST",
        data: { smiley_number: "1", is_start_smiley: true, is_end_smiley: true},
      }).done(function(response) {
        $('body').replaceWith(response);
      }).fail(function( error ) {
        console.log(error);
      });
}

function worryFormSubmit() {
    var worryText = $('#worry-form').elements['worry-text-input'];
}

function getCurrentTime() {
    var today = new Date();
    var date = today.getFullYear()+'-' + (today.getMonth()+1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return date + 'T' + time;
}