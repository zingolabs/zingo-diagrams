import type { ZainoRoadmapNode } from "@/data/zaino_roadmap";
import type { WrappedNode } from "./Canvas";

type Props = {
    data: WrappedNode['data'];
}

export default function NodeComponent({ data }: Props) {
    return <>
        <div className="text-sm font-medium leading-none">{data.id}</div>
    </>
}