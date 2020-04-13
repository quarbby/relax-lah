var GLOBAL_PAGETYPE = PAGETYPE_ENUM.STARTSMILEY;
var dataToSend = {};
var startLoop = 1;

// $(window).on('load', function(){
//     initState()
// });

// function initState() {
    GLOBAL_PAGETYPE = PAGETYPE_ENUM.STARTSMILEY;
    dataToSend = {};

    $('#smileyHeader').text(smileyHeaderStart);
// }

function smileyBtnClicked(smileyNumber) {
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

    if (GLOBAL_PAGETYPE == PAGETYPE_ENUM.STARTSMILEY) {
        dataToSend['startDate'] =  Date.now();
        dataToSend['startSmiley'] = smileyNumber;
        dataToSend['pageType'] = GLOBAL_PAGETYPE;

        $.ajax({
            url: "/",
            method: "POST",
            data: dataToSend,
            async: false
        }).done(function(response){
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
    else if (GLOBAL_PAGETYPE == PAGETYPE_ENUM.FEEDBACKSMILEY) { 
        dataToSend['endSmiley'] = smileyNumber;
        dataToSend['pageType'] = PAGETYPE_ENUM.FEEDBACKSMILEY;

        $.ajax({
            url: "/",
            method: "POST",
            data: dataToSend,
            async: false
        }).done(function(response){
            $('#body-container').fadeOut("slow", function(){
                var div = $(response).hide();
                $(this).replaceWith(div);
                $('#body-container').fadeIn("slow");
                $('#worryHeader').text(feedbackHeader);
                $('#worry-btn').text(feedbackBtnText);
                $('#worry-text').placeHolder = feedbackPlaceholder;
            });
            changePageType();
        }).fail(function(error){
            console.log(error);
    });
    }
}

function worrySubmitted() {
    var inputText = $('#worry-text').val();
    if (inputText != '') {
        dataToSend['entryText'] = inputText;
        dataToSend['endDate'] = Date.now();
    }

    if (GLOBAL_PAGETYPE == PAGETYPE_ENUM.WORRY) {
        dataToSend['pageType'] = GLOBAL_PAGETYPE;

        $.ajax({
            url: "/",
            method: "POST",
            data: dataToSend,
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
    else if (GLOBAL_PAGETYPE == PAGETYPE_ENUM.FEEDBACK) {       
        dataToSend['pageType'] = PAGETYPE_ENUM.FEEDBACK;

        $.ajax({
            url: "/",
            method: "POST",
            data: dataToSend,
            async: false
        }).done(function(response){
            console.log(response);
            $('#body-container').fadeOut("slow", function(){
            var div = $(response).hide();
            $(this).replaceWith(div);
            $('#body-container').fadeIn("slow");
        }).fail(function(error){
            console.log(error);
        });
        });
    }
}

function relaxDone() {

    $.ajax({
        url: "/",
        method: "POST",
        data: {pageType: GLOBAL_PAGETYPE},
        async: false
    }).done(function(response){
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

function performRelaxationactivity() {
    var totalLength = meditationTextWithTiming.length;

    meditationTextWithTiming.forEach((step, i) => {
        setTimeout(() => {
            if (i == totalLength-1) { isDone = true; }
            else { isDone = false; }

            setMeditationText(step.text, step.stepTiming, step.showTimer, isDone);
        }, step.timingDelay*1500);
    });
}

function setMeditationText(text, stepTiming, showTimer, isDone) {
    let mediHTML = "<div id='meditation-div'><p id='meditation-text'>" + text + "</p>";
    // if (showTimer) {
    //     mediHTML += "<p id='relax-timing'>" + stepTiming + "</p>"
    // } else {
        mediHTML += "<p id='relax-timing'></p>"
    // }
    mediHTML += "</div>";

    $('#meditation-div').fadeOut("slow", function(){
        var div = $(mediHTML).hide();
        $(this).replaceWith(div);

        if (isDone) {
            $('#relax-timing').text('');
        }

        var stepTimingCounter = stepTiming - 1;
        var stepTimingNoWordCounter = 0;

        // stepTimingCounter = stepTimingCounter - 1;

        var relaxTimer = setInterval(() => {
            if (showTimer) {
                console.log("showing timer")
                $('#relax-timing').text(stepTimingCounter);
            }
            else {
                $('#relax-timing').text('');
            }

            stepTimingCounter = stepTimingCounter - 1;

                if (stepTimingCounter == 0) {
                    clearInterval(relaxTimer);
                }
            }
        }, 1500 );

        $('#meditation-div').fadeIn("slow", function() {
            if (isDone) {
                $('#body-container').append("<button id='meditation-button' class='btn btn-blue-grey custom-btn'>Continue</button>").fadeIn("slow", function(){
                    $('#body-container').on("click", '#meditation-button', () => relaxDone());
                })
            }
        });
    });
}

function changePageType() {
    if (GLOBAL_PAGETYPE == PAGETYPE_ENUM.STARTSMILEY) {
        GLOBAL_PAGETYPE = PAGETYPE_ENUM.WORRY;
        $('#worryHeader').text(worryHeader);
    }

    else if (GLOBAL_PAGETYPE == PAGETYPE_ENUM.WORRY) {
        GLOBAL_PAGETYPE = PAGETYPE_ENUM.MEDITATION;
    }
    else if (GLOBAL_PAGETYPE == PAGETYPE_ENUM.MEDITATION) {
        GLOBAL_PAGETYPE = PAGETYPE_ENUM.FEEDBACKSMILEY;
        $('#smileyHeader').text(smileyHeaderEnd);
    }
    else if (GLOBAL_PAGETYPE == PAGETYPE_ENUM.FEEDBACKSMILEY) {
        GLOBAL_PAGETYPE = PAGETYPE_ENUM.FEEDBACK;
    }
}