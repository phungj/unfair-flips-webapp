export default function VictoryScreen({flipCount}) {
    return (
        <div>
            <h1>Congratulations!</h1>
            <h2>It took {flipCount} flips.</h2>
            <h2>Refresh to play again!</h2>
        </div>
    )
}