import {useRef, useEffect} from "react";

type VictoryDialogProps = {
    flipCount: number;
};

export default function VictoryDialog({flipCount}: VictoryDialogProps) {
    const victoryDialogRef = useRef<HTMLDialogElement>(null);
    useEffect(() => {victoryDialogRef.current?.showModal();}, []);

    return (
        <dialog ref={victoryDialogRef} className='text-center m-auto modal'>
            <div className='modal-box'>
                <h1 className='font-title text-heading text-2xl font-bold'>Congratulations!</h1>
                <h2>It took {flipCount} flips.</h2>
                <h2>Refresh to play again!</h2>
            </div>
        </dialog>
    );
}