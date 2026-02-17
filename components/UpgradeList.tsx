import UpgradeButton from "@/components/UpgradeButton";

import type {Cents} from "@/components/App";
import {HEADS_VALUE, HEADS_CHANCE_UPGRADE_INDEX, FLIP_TIME_UPGRADE_INDEX, COMBO_MULTIPLIER_UPGRADE_INDEX, HEADS_VALUE_UPGRADE_INDEX} from "@/components/App";

type UpgradeListProps = {
    cents: number,
    setCents: (cents: Cents) => void,
    upgradeCostIndices: number[],
    updateCostIndex: (number) => void,
    headsChance: number,
    setHeadsChance: (headsChange: number) => void,
    flipTime: number,
    setFlipTime: (flipTime: number) => void,
    comboMultiplier: number,
    setComboMultiplier: (comboMultiplier: number) => void,
    headsValue: HEADS_VALUE,
    setHeadsValue: (headsValue: number) => void,
    reset: boolean,
    setReset: (boolean) => void
};

export default function UpgradeList({cents, setCents, upgradeCostIndices, updateCostIndex, headsChance, setHeadsChance, flipTime, setFlipTime, comboMultiplier, setComboMultiplier, headsValue, setHeadsValue, reset, setReset}: UpgradeListProps) {
    const HEADS_CHANCE_INCREASE = 0.05;

    const FLIP_TIME_DECREASE = -200;

    const COMBO_MULTIPLIER_INCREASE = 0.5;

    // TODO: Refactor with upgradebutton factory method
    return (
        <div className="flex flex-col text-center">
            <h1 className="font-title text-heading text-2xl font-bold">Upgrades</h1>
            <h2 className="text-heading text-xl font-bold mb-2">{(cents / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})}</h2>
            <div className="flex flex-col justify-between flex-1">
                <UpgradeButton name="+5% Heads Chance" costs={[1, 10, 100, 1000, 10000, 100000, 1000000, 10000000]} costIndex={upgradeCostIndices[HEADS_CHANCE_UPGRADE_INDEX]} updateCostIndex={updateCostIndex} upgradeIndex={HEADS_CHANCE_UPGRADE_INDEX} cents={cents} setCents={setCents} currentUpgradeValue={headsChance} setUpgradeValue={setHeadsChance} computeNewUpgradeValue={curriedAdd(HEADS_CHANCE_INCREASE)} reset={reset} setReset={setReset}/>
                <UpgradeButton name="-0.2s Flip Time" costs={[1, 10, 100, 1000, 10000]} costIndex={upgradeCostIndices[FLIP_TIME_UPGRADE_INDEX]} updateCostIndex={updateCostIndex} upgradeIndex={FLIP_TIME_UPGRADE_INDEX} cents={cents} setCents={setCents} currentUpgradeValue={flipTime} setUpgradeValue={setFlipTime} computeNewUpgradeValue={curriedAdd(FLIP_TIME_DECREASE)} reset={reset} setReset={setReset}/>
                <UpgradeButton name="+0.5x Heads Combo Multiplier" costs={[1, 10, 100, 1000, 10000]} costIndex={upgradeCostIndices[COMBO_MULTIPLIER_UPGRADE_INDEX]} updateCostIndex={updateCostIndex} upgradeIndex={COMBO_MULTIPLIER_UPGRADE_INDEX} cents={cents} setCents={setCents} currentUpgradeValue={comboMultiplier} setUpgradeValue={setComboMultiplier} computeNewUpgradeValue={curriedAdd(COMBO_MULTIPLIER_INCREASE)} reset={reset} setReset={setReset}/>
                <UpgradeButton name="Upgrade Base Coin Worth" costs={[25, 100, 625, 10000]} costIndex={upgradeCostIndices[HEADS_VALUE_UPGRADE_INDEX]} updateCostIndex={updateCostIndex} upgradeIndex={HEADS_VALUE_UPGRADE_INDEX} cents={cents} setCents={setCents} currentUpgradeValue={headsValue} setUpgradeValue={setHeadsValue} computeNewUpgradeValue={computeNewHeadsValue} reset={reset} setReset={setReset}/>
            </div>
        </div>
    );

    function curriedAdd(a: number) {
        return (x: number) => x + a;
    }

    function upgradeHandler() {
        // TODO:
    }

    function computeNewHeadsValue(headsValue: HEADS_VALUE) {
        const nextStepMapping = {
            [HEADS_VALUE.PENNY]: HEADS_VALUE.NICKEL,
            [HEADS_VALUE.NICKEL]: HEADS_VALUE.DIME,
            [HEADS_VALUE.DIME]: HEADS_VALUE.QUARTER,
            [HEADS_VALUE.QUARTER]: HEADS_VALUE.DOLLAR,
            [HEADS_VALUE.DOLLAR]: HEADS_VALUE.DOLLAR
        };

        return nextStepMapping[headsValue];
    }
}