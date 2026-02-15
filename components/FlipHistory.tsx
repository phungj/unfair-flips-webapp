import type { CoinState } from "@/components/App"

type FlipHistoryProps = {
    flips: CoinState[];
};

export default function FlipHistory({flips}: FlipHistoryProps) {
    // TODO: look into eliminating the hardcoded height here
    return (
        <div>
            <h1 className="font-title text-heading text-2xl font-bold">Last 10 Flips</h1>
            <ol className="list grid grid-rows-10 h-80">
                {flips.map((flip, i) => <li key={i} className="list-row flex justify-center pb-5">{flip}</li>)}
            </ol>
        </div>);
}