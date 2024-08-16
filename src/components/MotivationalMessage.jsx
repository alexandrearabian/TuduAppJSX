export default function MotivationalMessage({ things, thingDone }) {
    const numThingsDone = things.filter((t) => t[thingDone]).length;
    const numThings = things.length;

    const getMessage = () => {
        if (numThings === 0) {
            return 'What will you accomplish today?';
        }
        if (numThingsDone / numThings * 10 === 10) {
            return 'You are done for the day!';
        }
        return 'The more you do, the more time you have';
    };

    return <h2 style={{marginTop: '-40%'}}>{getMessage()}</h2>;
}
