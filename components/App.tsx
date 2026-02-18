"use client"
import {useEffect, useMemo, useRef, useState} from "react"

import TitleDialog from "@/components/TitleDialog"
import UpgradeList from "@/components/UpgradeList";
import Coin from "@/components/Coin"
import FlipButton from "@/components/FlipButton";
import FlipHistory from "@/components/FlipHistory";
import VictoryDialog from "@/components/VictoryDialog";

const COIN_STATES = ["Heads", "Tails", "Flipping"] as const;
export type CoinState = typeof COIN_STATES[number];

export type Cents = number

export enum HEADS_VALUE{
    PENNY = 1,
    NICKEL = 5,
    DIME = 10,
    QUARTER = 25,
    DOLLAR = 100
}

export const HEADS_CHANCE_UPGRADE_INDEX = 0;
export const FLIP_TIME_UPGRADE_INDEX = 1;
export const COMBO_MULTIPLIER_UPGRADE_INDEX = 2;
export const HEADS_VALUE_UPGRADE_INDEX = 3;

export default function App() {
    const MAX_FLIPS = 10;
    const STARTING_FLIP_COUNT = 0;

    const STARTING_CENTS = 9999999;
    const STARTING_HEADS_CHANCE = 1;
    const STARTING_FLIP_TIME = 100;
    const STARTING_COMBO_MULTIPLIER = 1;

    const [flip, setFlip] = useState<CoinState>("Heads");
    const [flips, setFlips] = useState<CoinState[]>([]);
    const [flipCount, setFlipCount] = useState<number>(STARTING_FLIP_COUNT);

    const [cents, setCents] = useState<Cents>(STARTING_CENTS);
    const [headsChance, setHeadsChance] = useState<number>(STARTING_HEADS_CHANCE);
    const [flipTime, setFlipTime] = useState<number>(STARTING_FLIP_TIME);
    const [comboMultiplier, setComboMultiplier] = useState<number>(STARTING_COMBO_MULTIPLIER);
    const [headsValue, setHeadsValue] = useState<HEADS_VALUE>(HEADS_VALUE.PENNY);
    const [upgradeCostIndices, setUpgradeCostIndices] = useState<number[]>([0, 0, 0, 0]);

    const saveState = useMemo(() => (
        {flipCount, cents, headsChance, flipTime, comboMultiplier, headsValue, upgradeCostIndices}
    ), [flipCount, cents, headsChance, flipTime, comboMultiplier, headsValue, upgradeCostIndices]);

    useEffect(() => load(), []);
    useEffect(() => localStorage.setItem("save", JSON.stringify(saveState)), [saveState]);

    if (flips.length === MAX_FLIPS && flips.every(flip => flip === "Heads")) {
        return <VictoryDialog flipCount={flipCount} resetHandler={resetHandler}/>;
    }

    return (
        <div>
            <TitleDialog/>
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex h-full gap-4">
                    <UpgradeList cents={cents} setCents={updateCents} upgradeCostIndices={upgradeCostIndices} updateCostIndex={updateCostIndex} headsChance={headsChance} setHeadsChance={updateHeadsChance} flipTime={flipTime} setFlipTime={updateFlipTime} comboMultiplier={comboMultiplier} setComboMultiplier={updateComboMultiplier} headsValue={headsValue} setHeadsValue={updateHeadsValue}/>
                    <div className="flex-1 text-center">
                        <h2 className="font-title text-heading text-2xl font-bold mb-2">Heads Chance: {headsChance.toLocaleString("en-US", {style:"percent"})}</h2>
                        <div className="mb-2">
                            <Coin headsValue={headsValue} flip={flip}/>
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

    function load() {
        const loadedSaveState = JSON.parse(localStorage.getItem("save") || "{}");

        setFlipCount(loadedSaveState.flipCount || STARTING_FLIP_COUNT);

        setCents(loadedSaveState.cents || STARTING_CENTS);
        setHeadsChance(loadedSaveState.headsChance || STARTING_HEADS_CHANCE);
        setFlipTime(loadedSaveState.flipTime || STARTING_FLIP_TIME);
        setComboMultiplier(loadedSaveState.comboMultiplier || STARTING_COMBO_MULTIPLIER);
        setHeadsValue(loadedSaveState.headsValue || HEADS_VALUE.PENNY);
        setUpgradeCostIndices(loadedSaveState.upgradeCostIndices || [0, 0, 0, 0]);
    }

    function resetHandler() {
        setFlip("Heads");
        setFlips([]);
        setFlipCount(0);

        setCents(0);
        setHeadsChance(STARTING_HEADS_CHANCE);
        setFlipTime(STARTING_FLIP_TIME);
        setComboMultiplier(1);
        setHeadsValue(HEADS_VALUE.PENNY);
        setUpgradeCostIndices([0, 0, 0, 0])

        localStorage.setItem("save", JSON.stringify(saveState));
    }

    function updateCostIndex(i: number) {
        const updatedUpgradeCostIndices = structuredClone(upgradeCostIndices);

        updatedUpgradeCostIndices[i]++;

        setUpgradeCostIndices(updatedUpgradeCostIndices);
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

