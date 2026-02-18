import Image from "next/image";
import pennyHeadsImage from "../public/PennyHeads.png";
import pennyTailsImage from "../public/PennyTails.png";
import nickelHeadsImage from "../public/NickelHeads.png";
import nickelTailsImage from "../public/NickelTails.png";
import dimeHeadsImage from "../public/DimeHeads.png";
import dimeTailsImage from "../public/DimeTails.png";
import quarterHeadsImage from "../public/QuarterHeads.png";
import quarterTailsImage from "../public/QuarterTails.png";
import dollarHeadsImage from "../public/DollarHeads.png";
import dollarTailsImage from "../public/DollarTails.png";

import type {CoinState} from "@/components/App";
import {HEADS_VALUE} from "@/components/App";

type CoinProps = {
    headsValue: HEADS_VALUE,
    flip: CoinState
};

export default function Coin({headsValue, flip}: CoinProps) {
    let displayElement;

    if (flip === "Flipping") {
        displayElement = <h1 className='font-title text-heading text-2xl font-bold'>Flipping...</h1>;
    } else {
        const isHeads = flip === "Heads";

        let coinImage;

        switch (headsValue) {
            case HEADS_VALUE.PENNY:
                coinImage = isHeads ? pennyHeadsImage : pennyTailsImage;
                break;
            case HEADS_VALUE.NICKEL:
                coinImage = isHeads ? nickelHeadsImage : nickelTailsImage;
                break;
            case HEADS_VALUE.DIME:
                coinImage = isHeads ? dimeHeadsImage : dimeTailsImage;
                break;
            case HEADS_VALUE.QUARTER:
                coinImage = isHeads ? quarterHeadsImage : quarterTailsImage;
                break;
            case HEADS_VALUE.DOLLAR:
                coinImage = isHeads ? dollarHeadsImage : dollarTailsImage;
                break;
        }

        displayElement = <Image src={coinImage} alt={`The ${flip.toLowerCase()} side of a ${HEADS_VALUE[headsValue].toLowerCase()}`} fill/>;
    }

    return (
        <div className="relative w-xs aspect-square flex justify-center items-center">
            {displayElement}
        </div>
    );

}