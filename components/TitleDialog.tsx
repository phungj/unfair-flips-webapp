import {useRef, useEffect} from "react";

export default function TitleDialog() {
    const titleDialogRef = useRef<HTMLDialogElement>(null);
    useEffect(() => {titleDialogRef.current?.showModal();}, []);

    return (
        <dialog ref={titleDialogRef} className="text-center m-auto modal">
            <div className="modal-box">
                <h1 className="font-title text-heading text-2xl font-bold"><span className="line-through">Un</span>fair Flips</h1>
                <h2>A raw exercise in probability inspired by <a href="https://store.steampowered.com/app/3925760/Unfair_Flips/" className="link link-primary">Unfair Flips.</a></h2>
                <h2 className="mb-2">Your goal: flip ten heads in a row.</h2>
                <form method="dialog">
                    <button className="block mx-auto btn btn-sm btn-primary">Good Luck!</button>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button/>
            </form>
        </dialog>);
}