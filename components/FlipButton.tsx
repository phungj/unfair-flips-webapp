import {MouseEventHandler} from "react";

import type {CoinState} from "@/components/App";

type FlipButtonProps = {
    flipHandler: MouseEventHandler<HTMLButtonElement>,
    flip: CoinState
};

export default function FlipButton({flipHandler, flip}: FlipButtonProps) {
    return <button disabled={flip === "Flipping"} onClick={flipHandler} className="block mx-auto btn btn-primary">Flip!</button>;
}