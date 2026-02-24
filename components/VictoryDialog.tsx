import {useRef, useEffect} from "react";

type VictoryDialogProps = {
    flipCount: number,
    resetHandler: () => void
};

export default function VictoryDialog({flipCount, resetHandler}: VictoryDialogProps) {
    const victoryDialogRef = useRef<HTMLDialogElement>(null);
    useEffect(() => victoryDialogRef.current?.showModal(), []);

    useEffect(() => localStorage.removeItem("save"), []);

    return (
        <dialog ref={victoryDialogRef} className="text-center m-auto modal">
            <div className="modal-box">
                <h1 className="font-title text-heading text-2xl font-bold">Congratulations!</h1>
                <h2>It took {flipCount} flips.</h2>
                {generateEnding()}
                <form method="dialog">
                    <button onClick={resetHandler} className="block mx-auto btn btn-sm btn-primary">Play Again!</button>
                </form>
            </div>
        </dialog>
    );

    function generateEnding() {
        const ENDING_PROBABILITIES = [0.3, 0.2, 0.2, 0.2, 0.1];
        const ENDING_MESSAGES = ["the coin got RAed!", "the coin went yardy coiny!", "Ethan took the coin!", "the coin spoke at LUG!", "the coin landed heads!"];
        const endingRoll = Math.random();

        let i = 0;
        let endingProbabilitySum = ENDING_PROBABILITIES[i];

        while (endingRoll > endingProbabilitySum) {
            i++;
            endingProbabilitySum += ENDING_PROBABILITIES[i];
        }

        return <h2 className='mb-2'>{`You got ending ${i + 1}: ${ENDING_MESSAGES[i]} (${ENDING_PROBABILITIES[i].toLocaleString("en-US", {style:"percent"})})`}</h2>
    }
}