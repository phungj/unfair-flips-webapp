import {MouseEventHandler} from "react";

type FlipButtonProps = {
    flipHandler: MouseEventHandler<HTMLButtonElement>;
};

export default function FlipButton({flipHandler}: FlipButtonProps) {
    return <button onClick={flipHandler} className="block mx-auto btn btn-primary">Flip!</button>;
}