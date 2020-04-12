const PAGETYPE_ENUM = {
    STARTSMILEY: 'startsmiley',
    WORRY: 'worry',
    MEDITATION: 'meditation',
    RELAX: 'relax',
    FEEDBACK: 'feedback'
}

const smileyHeaderStart = 'How are you feeling today?';
const smileyHeaderEnd = 'We hope you\'re feeling better';

const worryTextEmpty = 'Come on, let your troubles out';
const feedbackTextEmpty = 'Really? Nothing?';
const feedbackDone = 'Thank you for your feedback!';
const feedbackError = 'Uhoh Error. Please try again when the server is more sane';

const worryHeader = 'It\'s okay to not feel okay. Rant below and watch it vanish, like magic';
const feedbackHeader = 'Leave us feedback, let us know how to make your day better';
const feedbackBtnText = 'Here\'s my feedback!'

const meditationTextWithTiming = [
    {
        timing: 10,
        text: "Take a seat or get into a comfortable position",
        stepTiming: 2
    },
    {
        timing: 10,
        text: "Spend the next few seconds noticing your breathing",
        stepTiming: 2
    },
    {
        timing: 8,
        text: "Now, breathe through your nose for the next 5 seconds",
        stepTiming: 5
    },
    {
        timing: 5,
        text: "Hold it for the next 4 seconds",
        stepTiming: 4
    },
    {
        timing: 13,
        text: "Now, slowly breath out with your mouth in the next 10 seconds",
        stepTiming: 10
    },
    {
        timing: 7,
        text: "It's okay if you didn't get it the first time. Let's try again",
        stepTiming: 2
    },
    {
        timing: 8,
        text: "Breathe in through your nose for the next 5 seconds",
        stepTiming: 5
    },
    {
        timing: 5,
        text: "Hold it for the next 4 seconds",
        stepTiming: 4
    },
    {
        timing: 12,
        text: "Slowly exhale with your mouth for the next 10 seconds",
        stepTiming: 10
    },
    {
        timing: 10,
        text: "You're getting it, let's do it once more",
        stepTiming: 2
    },
    {
        timing: 8,
        text: "Breathe in through your nose for the next 5 seconds",
        stepTiming: 5
    },
    {
        timing: 5,
        text: "Hold it for the next 4 seconds",
        stepTiming: 4
    },
    {
        timing: 12,
        text: "Slowly exhale with your mouth for the next 10 seconds",
        stepTiming: 10
    },
    {
        timing: 7,
        text: "And there you go.",
        stepTiming: 2
    },
]