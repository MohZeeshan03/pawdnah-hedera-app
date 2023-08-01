// export const contractAddress = "0x0000000000000000000000000000000000eb471d";
export const contractAddress = "0x0000000000000000000000000000000000320c79";
export const contractId = "0.0.3279993"
export const tokenId = "0.0.456858"
export const tokenAddress = "0x000000000000000000000000000000000006f89a";
export const TOKEN_DECIMALS = 6;

// TOKEN INFO
// Token ID : 0.0.15422247
// Token Address : 0x0000000000000000000000000000000000eb5327
// CONTRACT INFO
// Smart contract ID : 0.0.15422271
// Smart contract Address : 0x0000000000000000000000000000000000eb533f


export const trimAddress = (addr) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
}

export const formatPrice = (num) => {
    try {
      if (parseFloat(num) > 100) {
        return new Intl.NumberFormat('en-US', { maximumSignificantDigits: 8 }).format(num);
      }
      else {
        return parseFloat(parseFloat(num).toFixed(8));
      }
    }
    catch (err) {
      console.log(err.message);
      return 0;
    }
  }


export const ABI = [
    "constructor()",
    "event Approval(address indexed owner, address indexed spender, uint256 value)",
    "event ExcludeFromFees(address indexed account, bool isExcluded)",
    "event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)",
    "event SetAutomatedMarketMakerPair(address indexed pair, bool indexed value)",
    "event Transfer(address indexed from, address indexed to, uint256 value)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function automatedMarketMakerPairs(address) view returns (bool)",
    "function balanceOf(address account) view returns (uint256)",
    "function changeCooldownSettings(bool newStatus, uint256 newInterval)",
    "function cooldownEnabled() view returns (bool)",
    "function cooldownTimerInterval() view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function decreaseAllowance(address spender, uint256 subtractedValue) returns (bool)",
    "function excludeFromFees(address account, bool excluded)",
    "function increaseAllowance(address spender, uint256 addedValue) returns (bool)",
    "function isExcludedFromFees(address account) view returns (bool)",
    "function marketingFee() view returns (uint256)",
    "function marketingWallet() view returns (address)",
    "function maxTxAmount() view returns (uint256)",
    "function name() view returns (string)",
    "function owner() view returns (address)",
    "function renounceOwnership()",
    "function setAutomatedMarketMakerPair(address pair, bool value)",
    "function setFee(uint256 _marketingFee)",
    "function setMarketingWallet(address _newAddress)",
    "function setMaxTxAmount(uint256 newAmount)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function transfer(address recipient, uint256 amount) returns (bool)",
    "function transferFrom(address sender, address recipient, uint256 amount) returns (bool)",
    "function transferOwnership(address newOwner)",
    "function uniswapV2Pair() view returns (address)",
    "function uniswapV2Router() view returns (address)"
]

