import dynamic from "next/dynamic";

const RSUI32 = dynamic(() => import("../src/components/RSUI32"), { ssr: false });

export default function Home() {
    return <RSUI32 />;
}