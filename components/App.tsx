'use client'
import { useState } from "react"

import Title from '@/components/Title'
import Coin from '@/components/Coin'
import FlipButton from "@/components/FlipButton";
import FlipHistory from "@/components/FlipHistory";
import VictoryScreen from "@/components/VictoryScreen";

// TODO: Get styling done
// TODO: look into globals.css and layout.tsx
// TODO: Update the flip history to a table
// TODO: Possibly move the flip history to the side in a list alongside the flips and button, which means getting the holy grail set up?

export default function App() {
    const MAX_FLIPS = 10;

    const [flip, setFlip] = useState('Heads');
    const [flips, setFlips] = useState([]);
    const [flipCount, setFlipCount] = useState(0);

    if (flips.length === MAX_FLIPS && flips.every(flip => flip === 'Heads')) {
        return <VictoryScreen flipCount={flipCount}/>;
    }

    return (
        <div>
            <Title/>
            <Coin flip={flip}/>
            <FlipButton flipHandler={flipCoin}/>
            <FlipHistory flips={flips}/>
        </div>);

    function flipCoin() {
        const flip = Math.random() < 0.5 ? 'Heads' : 'Tails';

        setFlip(flip);

        const flipsCopy = structuredClone(flips);

        if (flipsCopy.length === MAX_FLIPS) {
            flipsCopy.shift();
        }

        flipsCopy.push(flip);

        setFlips(flipsCopy);

        setFlipCount(flipCount + 1);
    }
}

