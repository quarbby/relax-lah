const PAGETYPE_ENUM = {
    STARTSMILEY: 'startsmiley',
    WORRY: 'worry',
    MEDITATION: 'meditation',
    RELAX: 'relax',
    FEEDBACK: 'feedback'
}

const smileyHeaderStart = 'How Are You Feeling Today?';
const smileyHeaderEnd = 'We Hope You\'re Feeling Better';

const worryTextEmpty = 'Comeon, let your troubles out';
const feedbackTextEmpty = 'Really? Nothing?';
const feedbackDone = 'Thank you for your feedback!';
const feedbackError = 'Uhoh Error. Please try again when the server is more sane';

const worryHeader = 'It\'s okay to not feel okay. Rant below and watch it vanish, like magic';
const feedbackHeader = 'Leave us a feedback. Let us know how we can make your day better.';
const feedbackBtnText = 'Here\'s my feedback!'

const meditationTextWithTiming = [
    {
        timing: 10,
        text: "Take a seat or get into a comfortable position"
    },
    {
        timing: 10,
        text: "Spend the next few seconds noticing your breathing"
    },
    {
        timing: 8,
        text: "Now, breathe through your nose for the next 5 seconds"
    },
    {
        timing: 5,
        text: "Hold it for the next 4 seconds"
    },
    {
        timing: 13,
        text: "Now, slowly breath out with your mouth in the next 10 seconds"
    },
    {
        timing: 7,
        text: "It's okay if you didn't get it the first time. Let's try again"
    },
    {
        timing: 8,
        text: "Breathe in through your nose for the next 5 seconds"
    },
    {
        timing: 5,
        text: "Hold it for the next 4 seconds"
    },
    {
        timing: 12,
        text: "Slowly exhale with your mouth for the next 10 seconds"
    },
    {
        timing: 10,
        text: "You're getting it, let's do it once more"
    },
    {
        timing: 8,
        text: "Breathe in through your nose for the next 5 seconds"
    },
    {
        timing: 5,
        text: "Hold it for the next 4 seconds"
    },
    {
        timing: 12,
        text: "Slowly exhale with your mouth for the next 10 seconds"
    },
    {
        timing: 7,
        text: "And there you go."
    },
]