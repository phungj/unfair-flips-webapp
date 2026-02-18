type UpgradeButtonProps = {
    name: string,
    cost: number,
    canAfford: boolean,
    maxed: boolean,
    upgradeHandler: () => void
};

export default function UpgradeButton({name, cost, canAfford, maxed, upgradeHandler}: UpgradeButtonProps) {
    return (
        <button disabled={!canAfford || maxed} onClick={upgradeHandler} className="block mx-auto btn btn-primary w-full pb-10">
            <div>{name}</div>
            <div>{maxed ? "Maxed" : (cost / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})}</div>
        </button>
    );
}