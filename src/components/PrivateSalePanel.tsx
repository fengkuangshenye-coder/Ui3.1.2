import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { CFG } from '@/utils/constants';

interface PrivateSalePanelProps {
    onToast: (s: string) => void;
}

const RATE_RST_PER_USD = 500;

export function PrivateSalePanel({ onToast }: PrivateSalePanelProps) {
    const [asset, setAsset] = useState<'BNB' | 'USDT'>('BNB');
    const [amount, setAmount] = useState<number>(1);
    const [bnbPrice, setBnbPrice] = useState<number>(560);
    const [step, setStep] = useState<0 | 1 | 2>(0);

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const r = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT');
                const j = await r.json();
                const p = parseFloat(j.price);
                if (!isNaN(p)) setBnbPrice(p);
            } catch { }
        };
        fetchPrice();
        const id = setInterval(fetchPrice, 30000);
        return () => clearInterval(id);
    }, []);

    const usd = asset === 'BNB' ? amount * bnbPrice : amount;
    const rst = Math.floor(usd * RATE_RST_PER_USD).toLocaleString();

    const quicks = asset === 'BNB' ? [1, 5, 10] : [100, 500, 1000];

    const next = () => {
        if (step === 0) {
            onToast('Approve 成功');
            setStep(1);
        } else if (step === 1) {
            onToast('Contribute 已提交');
            setStep(2);
        } else {
            onToast('已领取');
        }
    };

    return (
        <Card className="bg-white/5 border-white/10 card-tilt">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-cyan-300" /> 私募（仅首批信任用户）
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <Button variant={asset === 'BNB' ? 'default' : 'outline'} className={asset === 'BNB' ? 'btn-neon' : ''} onClick={() => setAsset('BNB')}>BNB</Button>
                    <Button variant={asset === 'USDT' ? 'default' : 'outline'} className={asset === 'USDT' ? 'btn-neon' : ''} onClick={() => setAsset('USDT')}>USDT</Button>
                    <span className="text-muted-foreground ml-auto">时间(UTC)：{CFG.privateSale.timeUTC}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                    {quicks.map((q) => (
                        <Button key={q} variant="secondary" onClick={() => setAmount(q)}>
                            {asset === 'BNB' ? `${q} ${asset}` : `${q} ${asset}`}
                        </Button>
                    ))}
                </div>

                <div className="grid gap-2">
                    <label className="text-muted-foreground">参与金额（{asset}）</label>
                    <Input
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value || 0))}
                        className="bg-black/20 border-white/10"
                        type="number"
                        min={0}
                    />
                    <p className="text-xs text-muted-foreground">
                        预计可得：<span className="text-cyan-300 font-medium">{rst} RST</span>
                        <span className="ml-2">{asset === 'BNB' ? `按 BNB ≈ $${bnbPrice.toFixed(2)} 折算` : `按 USDT ≈ $1.00 折算`}</span>
                    </p>
                </div>

                {/* 步骤条 */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                    {[
                        { k: 0, t: 'Approve' },
                        { k: 1, t: 'Contribute' },
                        { k: 2, t: 'Claim' },
                    ].map((s) => (
                        <div key={s.k} className={`rounded-lg px-3 py-2 border border-white/10 bg-black/30 flex items-center justify-center ${step >= s.k ? 'ring-1 ring-cyan-500/50 shadow-[0_0_24px_#22d3ee40]' : ''}`}> 
                            {s.t}
                        </div>
                    ))}
                </div>

                <div className="flex gap-2">
                    <Button className="flex-1 btn-neon" onClick={next}>{step === 0 ? 'Approve' : step === 1 ? 'Contribute' : 'Claim'}</Button>
                    <Button variant="outline" className="flex-1" onClick={async () => {
                        try {
                            await navigator.clipboard.writeText(CFG.token.vault);
                            onToast('已复制合约地址');
                        } catch {
                            onToast('复制失败');
                        }
                    }}>复制金库地址</Button>
                </div>

                <div className="pt-2 text-xs text-muted-foreground">
                    <p>开盘后可点击 <span className="text-cyan-300">Claim 手续费领取</span>。</p>
                    <p>合约地址与 ABI 接入后，按钮将上链交互。</p>
                </div>
            </CardContent>
        </Card>
    );
}