var GLOBAL_PAGETYPE = PAGETYPE_ENUM.STARTSMILEY;
var dataToSend = {};

// $(window).on('load', function(){
//     initState()
// });

// function initState() {
    GLOBAL_PAGETYPE = PAGETYPE_ENUM.STARTSMILEY;
    dataToSend = {};

    $('#smileyHeader').text(smileyHeaderStart);
// }

function smileyBtnClicked(smileyNumber) {
    console.log(GLOBAL_PAGETYPE);

    if (GLOBAL_PAGETYPE == PAGETYPE_ENUM.STARTSMILEY) {
        dataToSend['startDate'] =  Date.now();
        dataToSend['startSmiley'] = smileyNumber;

        $.ajax({
            url: "/",
            method: "POST",
            data: {pageType: GLOBAL_PAGETYPE},
            async: false
        }).done(function(response){
            console.log(response);
            // $('#body-container').replaceWith(response);
            $('#body-container').fadeOut("slow", function(){
                var div = $(response).hide();
                $(this).replaceWith(div);
                $('#body-container').fadeIn("slow");
            });
            changePageType();
        }).fail(function(error){
            console.log(error);
    });
    }
    else if (GLOBAL_PAGETYPE == PAGETYPE_ENUM.FEEDBACK) { 
        console.log('getting in?');
        dataToSend['endSmiley'] = smileyNumber;
        let smileyHTML = "<div id='smiley-holder'>";
        for (let i = 0; i < 5; i++) {
            let currentNumber = i + 1;
            let buildString = "<div class='smiley faded smiley-" + currentNumber + "'></div>";
            if (smileyNumber == currentNumber) {
                buildString = "<div class='smiley smiley-" + currentNumber + "'></div>";
            }
            smileyHTML += buildString;
        }
        smileyHTML += "</div>";
        console.log(smileyHTML);
        $('#smiley-holder').fadeOut("fast", function(){
            var div = $(smileyHTML).hide();
            $(this).replaceWith(div);
            $('#smiley-holder').fadeIn("fast", function(){
                for (let i = 0; i < 5; i++) {
                    let currentNumber = i + 1;
                    let smallString = ".smiley-" + currentNumber;
                    $('#smiley-holder').on("click", smallString, () => smileyBtnClicked(currentNumber));
                }
            });
        });
    }
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
        GLOBAL_PAGETYPE = PAGETYPE_ENUM.FEEDBACK;
        $('#smileyHeader').text(smileyHeaderEnd);
        $('#worryHeader').text(feedbackHeader);
        $('#worry-btn').text(feedbackBtnText);
    }
}