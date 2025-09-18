import React from 'react';
import { TechBackground } from './TechBackground';
import { OracleGlobe } from './OracleGlobe';
import { PrivateSalePanel } from './PrivateSalePanel';
import { CFG } from '@/utils/constants';

export default function RSUI32() {
    // 这里仅保留主结构，实际使用时请根据你的原始代码补充 Section、NavLink、InfoRow、Kpi、RoadItem 等内容
    return (
        <div className="relative min-h-screen overflow-x-hidden">
            <TechBackground />
            <main className="container mx-auto px-4 py-8">
                <section className="mb-12">
                    <OracleGlobe className="mx-auto" height={260} neon />
                </section>
                <section className="mb-12">
                    <PrivateSalePanel onToast={(s) => alert(s)} />
                </section>
                {/* 其它内容按原始结构补充 */}
            </main>
        </div>
    );
}