import {useEffect, useRef, useState} from "react";

import type {Cents} from "@/components/App";

type UpgradeButtonProps = {
    name: string,
    costs: Cents[],
    costIndex: number,
    updateCostIndex: (number) => void,
    upgradeIndex: number,
    cents: Cents,
    setCents: (cents: Cents) => void,
    currentUpgradeValue: number,
    setUpgradeValue: (upgradeValue: number) => void,
    computeNewUpgradeValue: (currentUpgradeValue: number) => number,
};

export default function UpgradeButton({name, costs, costIndex, updateCostIndex, upgradeIndex, cents, setCents, currentUpgradeValue, setUpgradeValue, computeNewUpgradeValue}: UpgradeButtonProps) {
    const hasMounted = useRef<boolean>(false);

    const cost = costs[costIndex];
    const maxed = costIndex >= costs.length;

    // TODO: Lift this logic from the upgrade button to the upgrade list via callbacks
    useEffect(() => {
        const lastCostIndex = costIndex - 1

        if (hasMounted.current && !reset && lastCostIndex < costs.length) {
            console.log(`Upgrading ${name}`)
            setCents(cents - costs[lastCostIndex]);
            setUpgradeValue(computeNewUpgradeValue(currentUpgradeValue));
        } else if (!hasMounted.current) {
            hasMounted.current = true;
        } else if (reset) {
            setReset(false);
        }
    }, [costIndex]);

    return (
        <button disabled={maxed || cents < cost} onClick={onClick} className="block mx-auto btn btn-primary w-full pb-10">
            <div>{name}</div>
            <div>{maxed ? "Maxed" : (cost / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})}</div>
        </button>
    );

    function onClick() {
        updateCostIndex(upgradeIndex);
    }
}