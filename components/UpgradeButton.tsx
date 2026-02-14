import {useEffect, useState} from "react";

import type {Cents} from "@/components/App";

type UpgradeButtonProps = {
    name: string,
    costs: number[],
    cents: Cents,
    setCents: (cents: Cents) => void,
    currentUpgradeValue: number,
    setUpgradeValue: (upgradeValue: number) => void,
    computeNewUpgradeValue: (currentUpgradeValue: number) => number
};

export default function UpgradeButton({name, costs, cents, setCents, currentUpgradeValue, setUpgradeValue, computeNewUpgradeValue}: UpgradeButtonProps) {
    const [currentCostIndex, setCurrentCostIndex] = useState<number>(0);
    const [cost, setCost] = useState<number>(costs[currentCostIndex]);
    const [maxed, setMaxed] = useState<boolean>(false);

    // TODO: update this so that it doesn't run on the initial render
    useEffect(() => {
        if (currentCostIndex < costs.length) {
            setCents(cents - cost);
            setUpgradeValue(computeNewUpgradeValue(currentUpgradeValue))
            setCost(costs[currentCostIndex]);
        } else {
            setMaxed(true);
        }
    }, [currentCostIndex]);

    return (
        <button disabled={maxed || cents < cost} onClick={onClick} className="block mx-auto btn btn-primary w-full pb-10">
            <div>{name}</div>
            <div>{maxed ? "Maxed" : (cost / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})}</div>
        </button>
    );

    // TODO: Or figure out how ot best do this so that the value is reflected in the dom
    function onClick() {
        setCurrentCostIndex(currentCostIndex + 1);
    }
}