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
    if (GLOBAL_PAGETYPE == PAGETYPE_ENUM.STARTSMILEY) {
        dataToSend['startDate'] =  Date.now();
        dataToSend['startSmiley'] = smileyNumber;

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
            });
            changePageType();
        }).fail(function(error){
            console.log(error);
    });
    }
    else if (GLOBAL_PAGETYPE == PAGETYPE_ENUM.FEEDBACK) { 
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

            $.ajax({
                url: "/",
                method: "POST",
                data: dataToSend,
                async: false
            }).done(function(response){
               // $('#additional-text').text(feedbackError);
               $('#body-container').fadeOut("slow", function(){
                var div = $(response).hide();
                $(this).replaceWith(div);
                $('#body-container').fadeIn("slow");
            }).fail(function(error){
                console.log(error);
            });
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

function performRelaxationactivityOld() {
    let delay = 0;
    meditationTextWithTiming.forEach((step, i) => {
        setTimeout(() => {
           // console.log(delay);
            let timing = step.timing;
            let text = step.text;
            let stepTiming = step.stepTiming;

            // delay += timing;
            // delay += i;
            delay = i;
            let mediHTML = "<div id='meditation-text'>" + text + "</div>";
            // if (i == meditationTextWithTiming.length - 1) {
            //     mediHTML += "<div id='meditation-button'>Continue</div>";
            // }

            $('#meditation-text').fadeOut("slow", function(){
                var div = $(mediHTML).hide();
                $(this).replaceWith(div);

                let stepHTML = "<div id='relax-timing'></div>";
                $('#body-container').append(stepHTML);

                if (stepTiming != -1) {
                    setInterval(function(){
                        $('#relax-timing').text(stepTiming);
    
                        stepTiming = stepTiming - 1;
                    }, stepTiming*1000);
                }

                $('#meditation-text').fadeIn("slow", function() {
                    if (i == meditationTextWithTiming.length - 1) {
                        $('#body-container').append("<button id='meditation-button' class='btn btn-primary'>Continue</button>").fadeIn("slow", function(){
                            $('#body-container').on("click", '#meditation-button', () => relaxDone());
                        })
                    }
                });
            });
        }, i * 11000);
    });
}

function performRelaxationactivity() {
    var totalLength = meditationTextWithTiming.length;

    meditationTextWithTiming.forEach((step, i) => {
        setTimeout(() => {
            if (i == totalLength-1) { isDone = true; }
            else { isDone = false; }

            setMeditationText(step.text, isDone);
        }, step.stepTiming*1000);
    });
}

function setMeditationText(text, isDone) {
    let mediHTML = "<div id='meditation-text'>" + text + "</div>";

    console.log(mediHTML)

    $('#meditation-text').fadeOut("slow", function(){
        var div = $(mediHTML).hide();
        $(this).replaceWith(div);

        $('#meditation-text').fadeIn("slow", function() {
            if (isDone) {
                $('#body-container').append("<button id='meditation-button' class='btn btn-primary'>Continue</button>").fadeIn("slow", function(){
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
        GLOBAL_PAGETYPE = PAGETYPE_ENUM.FEEDBACK;
        $('#smileyHeader').text(smileyHeaderEnd);
        $('#worryHeader').text(feedbackHeader);
        $('#worry-btn').text(feedbackBtnText);
    }
}