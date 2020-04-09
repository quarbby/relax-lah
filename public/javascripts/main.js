var GLOBAL_PAGETYPE = PAGETYPE_ENUM.STARTSMILEY;
var dataToSend = {};

$(window).on('load', function(){
    initState()
});

function initState() {
    GLOBAL_PAGETYPE = PAGETYPE_ENUM.STARTSMILEY;
    dataToSend = {};

    setSmileyHeader();
}

function smileyBtnClicked(smileyNumber) {

    dataToSend['startDate'] = getCurrentTime();
    dataToSend['startSmiley'] = smileyNumber;

    doPost();
}

function worrySubmitted() {
    var worryText = $('#worry-text').val();
    if (worryText != '') {
        dataToSend['entryText'] = worryText;
        dataToSend['endDate'] = getCurrentTime();

        doPost();
    }
    else {
        $('#additional-text').text(worryTextEmpty);
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
    console.log(GLOBAL_PAGETYPE);
    doPost();
    setSmileyHeader();
}

// TO DO 
function setRelaxationactivity() {
    console.log('relax ' + GLOBAL_PAGETYPE)
    dataToSend['relaxActivity'] = '';
}

function doPost() {

    var postResponse = $.ajax({
            url: "/",
            method: "POST",
            data: {pageType: GLOBAL_PAGETYPE},
            async: false
        });

    $('#body-container').html(postResponse.responseText);

    changePageType();
}

function changePageType() {

    switch(GLOBAL_PAGETYPE) {
        case PAGETYPE_ENUM.STARTSMILEY:
            GLOBAL_PAGETYPE = PAGETYPE_ENUM.WORRY;
            $('#worryHeader').text(worryHeader);
            break;

        case PAGETYPE_ENUM.WORRY:
            console.log('changing worry ')
            GLOBAL_PAGETYPE = PAGETYPE_ENUM.RELAX;
            setRelaxationactivity();
            break;

        case PAGETYPE_ENUM.RELAX:
            GLOBAL_PAGETYPE = PAGETYPE_ENUM.ENDSMILEY;
            break;

        case PAGETYPE_ENUM.ENDSMILEY:
            GLOBAL_PAGETYPE = PAGETYPE_ENUM.FEEDBACK;
            break;

        default:
            GLOBAL_PAGETYPE = PAGETYPE_ENUM.STARTSMILEY;
            break;
    }
}