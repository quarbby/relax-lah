var GLOBAL_PAGETYPE = PAGETYPE_ENUM.STARTSMILEY;
var dataToSend = {};

// $(window).on('load', function(){
//     initState()
// });

// function initState() {
    GLOBAL_PAGETYPE = PAGETYPE_ENUM.STARTSMILEY;
    dataToSend = {};

    setSmileyHeader();
// }

function smileyBtnClicked(smileyNumber) {

    if (GLOBAL_PAGETYPE == PAGETYPE_ENUM.STARTSMILEY) {
        dataToSend['startDate'] =  Date.now();
        dataToSend['startSmiley'] = smileyNumber;
    }
    else if (GLOBAL_PAGETYPE == PAGETYPE_ENUM.ENDSMILEY) {
        dataToSend['endSmiley'] = smileyNumber;
    }

    $.ajax({
            url: "/",
            method: "POST",
            data: {pageType: GLOBAL_PAGETYPE},
            async: false
        }).done(function(response){
            // $('#body-container').replaceWith(response);
            $('#body-container').fadeOut("slow", function(){
                var div = $(response).hide();
                $(this).replaceWith(div);
                $('#body-container').fadeIn("slow");
                $('#worryHeader').text(feedbackHeader);
                $('#worry-btn').text(feedbackBtnText);
            });
            changePageType();
        }).fail(function(error){
            console.log(error);
    });

}

function worrySubmitted() {
    var inputText = $('#worry-text').val();

    if (GLOBAL_PAGETYPE == PAGETYPE_ENUM.WORRY) {
        if (inputText != '') {
            dataToSend['entryText'] = inputText;
            dataToSend['endDate'] = Date.now();

            $.ajax({
                url: "/",
                method: "POST",
                data: {pageType: GLOBAL_PAGETYPE},
                async: false
            }).done(function(response){
                // $('#body-container').replaceWith(response);
                $('#body-container').fadeOut("slow", function(){
                    var div = $(response).hide();
                    $(this).replaceWith(div);
                    $('#body-container').fadeIn("slow");
                    changePageType();
                });
            }).fail(function(error){
                console.log(error);
            });
        }
        else {
            $('#additional-text').text(worryTextEmpty);
        }
    }

    else if (GLOBAL_PAGETYPE == PAGETYPE_ENUM.FEEDBACK) {
        if (inputText != '') {
            dataToSend['feedbackText'] = inputText;
            dataToSend['pageType'] = PAGETYPE_ENUM.FEEDBACK;

            console.log(dataToSend)

            $.ajax({
                url: "/",
                method: "POST",
                data: dataToSend,
                async: false
            }).done(function(response){
                $('#additional-text').text(feedbackDone);
            }).fail(function(error){
                console.log(error);
                $('#additional-text').text(feedbackError);
            });

        }
        else {
            $('#additional-text').text(feedbackTextEmpty);
        }
    }

}

function getCurrentTime() {
    var today = new Date();
    var date = today.getFullYear()+'-' + (today.getMonth()+1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return date + 'T' + time;
}

function setSmileyHeader() {
    if (GLOBAL_PAGETYPE == PAGETYPE_ENUM.STARTSMILEY) {
        $('#smileyHeader').text(smileyHeaderStart);
    }
    else if (GLOBAL_PAGETYPE = PAGETYPE_ENUM.ENDSMILEY) {
        $('#smileyHeader').text(smileyHeaderEnd);
    }
}

function relaxDone() {

    $.ajax({
        url: "/",
        method: "POST",
        data: {pageType: GLOBAL_PAGETYPE},
        async: false
    }).done(function(response){
        $('#body-container').replaceWith(response);
        changePageType();
    }).fail(function(error){
        console.log(error);
    });
}

// TO DO 
function setRelaxationactivity() {
    dataToSend['relaxActivity'] = '';
}

function changePageType() {
    if (GLOBAL_PAGETYPE == PAGETYPE_ENUM.STARTSMILEY) {
        GLOBAL_PAGETYPE = PAGETYPE_ENUM.WORRY;
        $('#worryHeader').text(worryHeader);
    }
    else if (GLOBAL_PAGETYPE == PAGETYPE_ENUM.WORRY) {
        GLOBAL_PAGETYPE = PAGETYPE_ENUM.RELAX;

        setRelaxationactivity();
    }
    else if (GLOBAL_PAGETYPE == PAGETYPE_ENUM.RELAX) {
        GLOBAL_PAGETYPE = PAGETYPE_ENUM.ENDSMILEY;
        setSmileyHeader();
    }
    else if (GLOBAL_PAGETYPE == PAGETYPE_ENUM.ENDSMILEY) {
        GLOBAL_PAGETYPE = PAGETYPE_ENUM.FEEDBACK;
    }
}