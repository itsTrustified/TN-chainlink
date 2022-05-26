  
const BOBA = {
    chainId: "0x1c",
    chainName: "Rinkeby BOBA",
    rpcUrls: ["https://rinkeby.boba.network"],
    nativeCurrency: {
        name: "Rinkeby",
        symbol: "ETH",
        decimals: 18,
    },
    blockExplorerUrls: ["https://blockexplorer.rinkeby.boba.network"],
} 
export { BOBA }; 

const POLYGON = {
    chainId: "0x13881",
    chainName: "Mumbai",
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
    nativeCurrency: {
        name: "Matic",
        symbol: "MATIC",
        decimals: 18,
    },
    blockExplorerUrls: ["https://mumbai.polygonscan.com"],
} 
export { POLYGON };

const Ropsten = {
    chainId: "0x3",
    chainName: "Ropsten",
    rpcUrls: ["https://ropsten.infura.io/v3/"],
    nativeCurrency: {
        name: "Ropsten",
        symbol: "ETH",
        decimals: 18,
    },
    blockExplorerUrls: ["https://ropsten.etherscan.io"],
} 
export { Ropsten };

const BSC = {
    chainId: "0x61",
    chainName: "Binance",
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
    nativeCurrency: {
        name: "BSC",
        symbol: "BNB",
        decimals: 18,
    },
    blockExplorerUrls: ["https://testnet.bscscan.com"],
} 
export { BSC };

const AVAX = {
    chainId: "0xa869",
    chainName: "avalanche",
    rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
    nativeCurrency: {
        name: "AVAX FUJI",
        symbol: "AVAX",
        decimals: 18,
    },
    blockExplorerUrls: ["https://testnet.snowtrace.io"],
} 
export { AVAX };
 