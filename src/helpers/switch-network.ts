import { Networks } from "../constants/blockchain";

interface NativeCurrency {
    name: string;
    symbol: string;
    decimals: number;
}

interface NetworkInfo {
    chainId: string;
    chainName: string;
    nativeCurrency: NativeCurrency;
    rpcUrls: Array<string>;
    blockExplorerUrls: Array<string>;
}

const AVALANCHE_MAINNET_PARAMS = {
    chainId: "0xA86A",
    chainName: "Avalanche Mainnet C-Chain",
    nativeCurrency: {
        name: "Avalanche",
        symbol: "AVAX",
        decimals: 18,
    },
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://snowtrace.io/"],
};

const AVALANCHE_TESTNET_PARAMS = {
    chainId: "0xA869",
    chainName: "Avalanche Testnet C-Chain",
    nativeCurrency: {
        name: "Avalanche",
        symbol: "AVAX",
        decimals: 18,
    },
    rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://testnet.snowtrace.io/"],
};

const switchRequest = () => {
    return window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xA869" }],
    });
};

const addChainRequest = () => {
    return window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [AVALANCHE_TESTNET_PARAMS],
    });
};

export const swithNetwork = async () => {
    if (window.ethereum) {
        try {
            console.warn("Trying switch ()");
            await switchRequest();
        } catch (error: any) {
            if (error.code === 4902) {
                try {
                    await addChainRequest();
                    await switchRequest();
                } catch (addError) {
                    console.log(error);
                }
            }
            console.log(error);
        }
    }
};
