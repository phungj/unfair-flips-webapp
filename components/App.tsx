"use client"
import { useState } from "react"

import TitleDialog from "@/components/TitleDialog"
import UpgradeList from "@/components/UpgradeList";
import Coin from "@/components/Coin"
import FlipButton from "@/components/FlipButton";
import FlipHistory from "@/components/FlipHistory";
import VictoryDialog from "@/components/VictoryDialog";

const COIN_STATES = ["Heads", "Tails", "Flipping"] as const;
export type CoinState = typeof COIN_STATES[number];

export type Cents = number

// TODO: Add endings
// TODO: Update coin image based on coin worth
// TODO: add scrolling through flip history, make it 20 flips or so?
// TODO: Implement saving and local storage
// TODO: Add the ability to reset your save

// TODO: Coin display component?
// TODO: style both sides of the components next to the heads so they're the same width and the coin is centered
// TODO: Get typing for variables as necessary
// TODO: other custom types and enums for your upgrades?

export default function App() {
    const MAX_FLIPS = 10;

    const [flip, setFlip] = useState<CoinState>("Heads");
    const [flips, setFlips] = useState<CoinState[]>([]);
    const [flipCount, setFlipCount] = useState<number>(0);

    const [cents, setCents] = useState<Cents>(0);
    const [headsChance, setHeadsChance] = useState<number>(0.20);
    const [flipTime, setFlipTime] = useState<number>(2000);
    const [comboMultiplier, setComboMultiplier] = useState<number>(1);
    const [headsValue, setHeadsValue] = useState<number>(1);

    if (flips.length === MAX_FLIPS && flips.every(flip => flip === "Heads")) {
        return <VictoryDialog flipCount={flipCount}/>;
    }

    return (
        <div>
            <TitleDialog/>
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex h-full gap-4">
                    <UpgradeList cents={cents} setCents={updateCents} headsChance={headsChance} setHeadsChance={updateHeadsChance} flipTime={flipTime} setFlipTime={updateFlipTime} comboMultiplier={comboMultiplier} setComboMultiplier={updateComboMultiplier} headsValue={headsValue} setHeadsValue={updateHeadsValue}/>
                    <div className="flex-1 text-center">
                        <h2 className="font-title text-heading text-2xl font-bold mb-2">Heads Chance: {headsChance.toLocaleString("en-US", {style:"percent"})}</h2>
                        <div className="mb-2">
                            <Coin flip={flip}/>
                        </div>
                        <FlipButton flipHandler={flipCoin} flip={flip}/>
                    </div>
                    <FlipHistory flips={flips}/>
                </div>
            </div>
        </div>);

    function flipCoin() {
        setFlip("Flipping")

        setTimeout(() => {
            const flip = Math.random() < headsChance ? "Heads" : "Tails";

            setFlip(flip);

            const flipsCopy = structuredClone(flips);

            if (flipsCopy.length === MAX_FLIPS) {
                flipsCopy.shift();
            }

            flipsCopy.push(flip);

            setFlips(flipsCopy);

            setFlipCount(flipCount + 1);

            if (flip === "Heads") {
                setCents(cents + headsValue * Math.ceil(comboMultiplier ** computeCombo()));
            }
        }, flipTime)
    }

    function computeCombo(): number {
        const lastTailsIndex = flips.lastIndexOf("Tails")

        return flips.length - (lastTailsIndex == -1 ? 0 : lastTailsIndex)
    }

    function updateCents(cents: Cents) {
        setCents(cents);
    }

    function updateHeadsChance(headsChance: number) {
        setHeadsChance(headsChance);
    }

    function updateFlipTime(flipTime: number) {
        setFlipTime(flipTime);
    }

    function updateComboMultiplier(comboMultiplier: number) {
        setComboMultiplier(comboMultiplier);
    }

    function updateHeadsValue(headsValue: number) {
        setHeadsValue(headsValue);
    }
}

