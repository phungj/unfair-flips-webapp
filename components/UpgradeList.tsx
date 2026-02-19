import UpgradeButton from "@/components/UpgradeButton";

import type {Cents} from "@/components/App";
import {HEADS_VALUE, HEADS_CHANCE_UPGRADE_INDEX, FLIP_TIME_UPGRADE_INDEX, COMBO_MULTIPLIER_UPGRADE_INDEX, HEADS_VALUE_UPGRADE_INDEX} from "@/components/App";

type UpgradeListProps = {
    cents: number,
    setCents: (cents: Cents) => void,
    upgradeCostIndices: number[],
    updateCostIndex: (costIndex: number) => void,
    headsChance: number,
    setHeadsChance: (headsChange: number) => void,
    flipTime: number,
    setFlipTime: (flipTime: number) => void,
    comboMultiplier: number,
    setComboMultiplier: (comboMultiplier: number) => void,
    headsValue: HEADS_VALUE,
    setHeadsValue: (headsValue: number) => void,
};

export default function UpgradeList({cents, setCents, upgradeCostIndices, updateCostIndex, headsChance, setHeadsChance, flipTime, setFlipTime, comboMultiplier, setComboMultiplier, headsValue, setHeadsValue}: UpgradeListProps) {
    const HEADS_CHANCE_UPGRADE_COSTS = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000];
    const HEADS_CHANCE_UPGRADE_INCREASE = 0.05;

    const currentHeadsChanceUpgradeCostIndex = upgradeCostIndices[HEADS_CHANCE_UPGRADE_INDEX]
    const currentHeadsChanceUpgradeCost = HEADS_CHANCE_UPGRADE_COSTS[currentHeadsChanceUpgradeCostIndex];

    const FLIP_TIME_UPGRADE_COSTS = [1, 10, 100, 1000, 10000];
    const FLIP_TIME_UPGRADE_DECREASE = -200;

    const currentFlipTimeUpgradeCostIndex = upgradeCostIndices[FLIP_TIME_UPGRADE_INDEX];
    const currentFlipTimeUpgradeCost = FLIP_TIME_UPGRADE_COSTS[currentFlipTimeUpgradeCostIndex];

    const COMBO_MULTIPLIER_UPGRADE_COSTS = [1, 10, 100, 1000, 10000];
    const COMBO_MULTIPLIER_UPGRADE_INCREASE = 0.5;

    const currentComboMultiplierUpgradeCostIndex = upgradeCostIndices[COMBO_MULTIPLIER_UPGRADE_INDEX];
    const currentComboMultiplierUpgradeCost = COMBO_MULTIPLIER_UPGRADE_COSTS[currentComboMultiplierUpgradeCostIndex];

    const HEADS_VALUE_UPGRADE_COSTS = [25, 100, 625, 10000]
    const HEADS_VALUE_UPGRADE_MAPPING = {
        [HEADS_VALUE.PENNY]: HEADS_VALUE.NICKEL,
        [HEADS_VALUE.NICKEL]: HEADS_VALUE.DIME,
        [HEADS_VALUE.DIME]: HEADS_VALUE.QUARTER,
        [HEADS_VALUE.QUARTER]: HEADS_VALUE.DOLLAR,
        [HEADS_VALUE.DOLLAR]: HEADS_VALUE.DOLLAR
    };

    const currentHeadsValueUpgradeCostIndex = upgradeCostIndices[HEADS_VALUE_UPGRADE_INDEX];
    const currentHeadsValueUpgradeCost = HEADS_VALUE_UPGRADE_COSTS[currentHeadsValueUpgradeCostIndex];

    return (
        <div className="flex flex-col text-center">
            <h1 className="font-title text-heading text-2xl font-bold">Upgrades</h1>
            <h2 className="text-heading text-xl font-bold mb-2">{(cents / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})}</h2>
            <div className="flex flex-col justify-between flex-1">
                <UpgradeButton name="+5% Heads Chance" cost={currentHeadsChanceUpgradeCost} canAfford={cents >= currentHeadsChanceUpgradeCost} maxed={currentHeadsChanceUpgradeCostIndex >= HEADS_CHANCE_UPGRADE_COSTS.length} upgradeHandler={headsChanceUpgradeHandler}/>
                <UpgradeButton name="-0.2s Flip Time" cost={currentFlipTimeUpgradeCost} canAfford={cents >= currentFlipTimeUpgradeCost} maxed={currentFlipTimeUpgradeCostIndex >= FLIP_TIME_UPGRADE_COSTS.length} upgradeHandler={flipTimeUpgradeHandler}/>
                <UpgradeButton name="+0.5x Heads Combo Multiplier" cost={currentComboMultiplierUpgradeCost} canAfford={cents >= currentComboMultiplierUpgradeCost} maxed={currentComboMultiplierUpgradeCostIndex >= COMBO_MULTIPLIER_UPGRADE_COSTS.length} upgradeHandler={comboMultiplierUpgradeHandler}/>
                <UpgradeButton name="Upgrade Base Coin Worth" cost={currentHeadsValueUpgradeCost} canAfford={cents >= currentHeadsValueUpgradeCost} maxed={currentHeadsValueUpgradeCostIndex >= HEADS_VALUE_UPGRADE_COSTS.length} upgradeHandler={headsValueUpgradeHandler}/>
            </div>
        </div>
    );

    function headsChanceUpgradeHandler() {
        setCents(cents - currentHeadsChanceUpgradeCost);
        setHeadsChance(headsChance + HEADS_CHANCE_UPGRADE_INCREASE);
        updateCostIndex(HEADS_CHANCE_UPGRADE_INDEX);
    }

    function flipTimeUpgradeHandler() {
        setCents(cents - currentFlipTimeUpgradeCost);
        setFlipTime(flipTime + FLIP_TIME_UPGRADE_DECREASE);
        updateCostIndex(FLIP_TIME_UPGRADE_INDEX);
    }

    function comboMultiplierUpgradeHandler() {
        setCents(cents - currentComboMultiplierUpgradeCost);
        setComboMultiplier(comboMultiplier + COMBO_MULTIPLIER_UPGRADE_INCREASE);
        updateCostIndex(COMBO_MULTIPLIER_UPGRADE_INDEX);
    }

    function headsValueUpgradeHandler() {
        setCents(cents - currentHeadsValueUpgradeCost);
        setHeadsValue(HEADS_VALUE_UPGRADE_MAPPING[headsValue]);
        updateCostIndex(HEADS_VALUE_UPGRADE_INDEX);
    }
}