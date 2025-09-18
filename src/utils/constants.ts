export const CFG = {
    token: {
        name: "RStoken",
        symbol: "RST",
        chain: "BSC",
        decimals: 18,
        contract: "【可填主网地址】",
        oracleRegistry: "【可填主网地址】",
        vault: "【可填金库地址】",
    },
    links: {
        scan: "#",
        privateSale: "#",
        whitepaper: "#",
        github: "#",
        twitter: "#",
        telegram: "#",
        discord: "#",
        chinaHub: "#",
    },
    privateSale: {
        timeUTC: "【可填UTC时间】",
        payAssets: ["BNB", "USDT"],
        liquidityLock: "【可填期限】",
    },
    distribution: [
        { name: "社区与流动性", value: 42 },
        { name: "生态基金", value: 23 },
        { name: "团队与顾问(锁仓)", value: 20 },
        { name: "市场与运营", value: 15 },
    ],
};