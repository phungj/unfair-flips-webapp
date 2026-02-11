'use client'
import { useState } from "react"

import TitleDialog from '@/components/TitleDialog'
import Coin from '@/components/Coin'
import FlipButton from "@/components/FlipButton";
import FlipHistory from "@/components/FlipHistory";
import VictoryDialog from "@/components/VictoryDialog";

const COIN_SIDES = ['Heads', 'Tails'] as const;
export type CoinSide = typeof COIN_SIDES[number];

export default function App() {
    const MAX_FLIPS = 10;

    const [flip, setFlip] = useState<CoinSide>('Heads');
    const [flips, setFlips] = useState<CoinSide[]>([]);
    const [flipCount, setFlipCount] = useState<number>(0);

    if (flips.length === MAX_FLIPS && flips.every(flip => flip === 'Heads')) {
        return <VictoryDialog flipCount={flipCount}/>;
    }

    return (
        <div>
            <TitleDialog/>
            <div className='min-h-screen flex items-center justify-center'>
                <div className='flex h-100 gap-4'>
                    <div className='flex-1'>
                        <div className='mb-1'>
                            <Coin flip={flip}/>
                        </div>
                        <FlipButton flipHandler={flipCoin}/>
                    </div>
                    <FlipHistory flips={flips}/>
                </div>
            </div>
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

