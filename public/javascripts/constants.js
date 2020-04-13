const PAGETYPE_ENUM = {
    STARTSMILEY: 'startsmiley',
    WORRY: 'worry',
    MEDITATION: 'meditation',
    RELAX: 'relax',
    FEEDBACK: 'feedback',
    FEEDBACKSMILEY: 'feedbackSmiley'
}

const smileyHeaderStart = 'How are you feeling today?';
const smileyHeaderEnd = 'How do you feel now?';

const worryTextEmpty = 'Come on, let your troubles out';
const feedbackTextEmpty = 'Really? Nothing?';
const endSmileyEmpty = 'Please rate how the relaxation activity has help you.';
const endSmileySuccess = 'Do Smile!';
const feedbackPlaceholder = 'A little improvement tip, please?';
const feedbackDone = 'Thank you for your feedback!';
const feedbackError = 'Uhoh Error. Please try again when the server is more sane';

const worryHeader = 'It\'s okay to not feel okay. Rant below and watch it vanish, like magic';
const feedbackHeader = 'Leave us feedback, let us know how to make your day better';
const feedbackBtnText = 'Here\'s my feedback!'

const meditationTextWithTiming = [
    {
        text: "Take a seat or get into a comfortable position",
        stepTiming: 5,
        showTimer: false,
        timingDelay: 0
    },
    {
        text: "Spend the next few seconds noticing your breathing",
        stepTiming: 5,
        showTimer: false,
        timingDelay: 5
    },
    {
        text: "Now, breathe through your nose for the next 5 seconds",
        stepTiming: 5,
        showTimer: false,
        timingDelay: 10
    },
    {
        text: "Hold it for the next 4 seconds",
        stepTiming: 4,
        showTimer: true,
        timingDelay: 15
    },
    {
        text: "Now, slowly breathe out with your mouth for the next 10 seconds",
        stepTiming: 10,
        showTimer: true,
        timingDelay: 19
    },
    {
        text: "It's okay if you didn't get it the first time. Let's try again",
        stepTiming: 4,
        showTimer: true,
        timingDelay: 29
    },
    {
        text: "Breathe in through your nose for the next 5 seconds",
        stepTiming: 5,
        showTimer: true,
        timingDelay: 34
    },
    {
        text: "Hold it for the next 4 seconds",
        stepTiming: 4,
        showTimer: true,
        timingDelay: 38
    },
    {
        text: "Slowly exhale with your mouth for the next 10 seconds",
        stepTiming: 10,
        showTimer: true,
        timingDelay: 48
    },
    {
        text: "You're getting it, let's do it once more",
        stepTiming: 5,
        timingDelay: 53,
        showTimer: false
    },
    {
        text: "Breathe in through your nose for the next 5 seconds",
        stepTiming: 5,
        timingDelay: 58,
        showTimer: true
    },
    {
        text: "Hold it for the next 4 seconds",
        stepTiming: 4,
        timingDelay: 62,
        showTimer: true
    },
    {
        text: "Slowly exhale with your mouth for the next 10 seconds",
        stepTiming: 10,
        timingDelay: 72,
        showTimer: true
    },
    {
        text: "And there you go.",
        stepTiming: 5,
        timingDelay: 77,
        showTimer: false
    },
]