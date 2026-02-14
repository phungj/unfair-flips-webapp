import {Dispatch, SetStateAction} from "react";

import UpgradeButton from "@/components/UpgradeButton";

import type {Cents} from "@/components/App";

type UpgradeListProps = {
    cents: number,
    setCents: (cents: Cents) => void
    headsChance: number,
    setHeadsChance: (headsChange: number) => void,
    flipTime: number,
    setFlipTime: (flipTime: number) => void,
    comboMultiplier: number,
    setComboMultiplier: (comboMultiplier: number) => void,
    headsValue: number,
    setHeadsValue: (headsValue: number) => void
};

export default function UpgradeList({cents, setCents, headsChance, setHeadsChance, flipTime, setFlipTime, comboMultiplier, setComboMultiplier, headsValue, setHeadsValue}: UpgradeListProps) {
    const HEADS_CHANCE_INCREASE = 0.05;
    const FLIP_TIME_DECREASE = -200;
    const HEADS_COMBO_MULTIPLIER_INCREASE = 0.5;
    const HEADS_VALUES_UPGRADE_MAPPING = new Map([[1, 5], [5, 10], [10, 25], [25, 100]]);

    return (
        <div className="flex flex-col text-center">
            <h1 className="font-title text-heading text-2xl font-bold">Upgrades</h1>
            <h2 className="text-heading text-xl font-bold mb-2">{(cents / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})}</h2>
            <div className="flex flex-col justify-between flex-1">
                <UpgradeButton name="+5% Heads Chance" costs={[1, 10, 100, 1000, 10000, 100000, 1000000, 10000000]} cents={cents} setCents={setCents} currentUpgradeValue={headsChance} setUpgradeValue={setHeadsChance} computeNewUpgradeValue={curriedAdd(HEADS_CHANCE_INCREASE)}/>
                <UpgradeButton name="-0.2s Flip Time" costs={[1, 10, 100, 1000, 10000]} cents={cents} setCents={setCents} currentUpgradeValue={flipTime} setUpgradeValue={setFlipTime} computeNewUpgradeValue={curriedAdd(FLIP_TIME_DECREASE)}/>
                <UpgradeButton name="+0.5x Heads Combo Multiplier" costs={[1, 10, 100, 1000, 10000]} cents={cents} setCents={setCents} currentUpgradeValue={comboMultiplier} setUpgradeValue={setComboMultiplier} computeNewUpgradeValue={curriedAdd(HEADS_COMBO_MULTIPLIER_INCREASE)}/>
                <UpgradeButton name="Upgrade Base Coin Worth" costs={[25, 100, 625, 10000]} cents={cents} setCents={setCents} currentUpgradeValue={headsValue} setUpgradeValue={setHeadsValue} computeNewUpgradeValue={(headsValue: number): number => HEADS_VALUES_UPGRADE_MAPPING.get(headsValue) as number}/>
            </div>
        </div>
    );

    function curriedAdd(a: number) {
        return (x: number) => x + a
    }
}