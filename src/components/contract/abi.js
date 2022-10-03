export const abi = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_diff",
                "type": "uint256"
            }
        ],
        "name": "newGuessGame",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "preimage",
                "type": "uint256"
            }
        ],
        "name": "trySolve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "current_diff",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]