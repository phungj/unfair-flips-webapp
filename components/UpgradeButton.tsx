import {useEffect, useRef, useState} from "react";

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
    const hasMounted = useRef<boolean>(false)

    const [currentCostIndex, setCurrentCostIndex] = useState<number>(0);
    const cost = costs[currentCostIndex];
    const maxed = currentCostIndex >= costs.length;

    useEffect(() => {
        const lastCostIndex = currentCostIndex - 1

        if (hasMounted.current && lastCostIndex < costs.length) {
            setCents(cents - costs[lastCostIndex]);
            setUpgradeValue(computeNewUpgradeValue(currentUpgradeValue));
        }

        if (!hasMounted.current) {
            hasMounted.current = true;
        }
    }, [currentCostIndex]);

    return (
        <button disabled={maxed || cents < cost} onClick={onClick} className="block mx-auto btn btn-primary w-full pb-10">
            <div>{name}</div>
            <div>{maxed ? "Maxed" : (cost / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})}</div>
        </button>
    );

    function onClick() {
        setCurrentCostIndex(currentCostIndex => currentCostIndex + 1);
    }
}