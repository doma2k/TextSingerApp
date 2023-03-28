const provider = new ethers.providers.Web3Provider(window.ethereum, 97);
const contractAddress = "0x8fb5DBC4B83FcB8E8d8E60f17a7DC38A2d2FDA43";
const abi = [{ "inputs": [{ "internalType": "address[]", "name": "addressesToAdd", "type": "address[]" }], "name": "addToWhitelist", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "areAllSignaturesCollected", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getDocumentHash", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getWhitelist", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "addressToCheck", "type": "address" }], "name": "hasSignedDocument", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "addressToCheck", "type": "address" }], "name": "isAddressWhitelisted", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isDocumentSigned", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "hash", "type": "string" }], "name": "setDocumentHash", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "signDocument", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
let contract;

async function switchNetwork(networkId) {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: networkId }],
        });
    } catch (error) {
        console.error(error);
    }
};

provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
        signer = provider.getSigner(accounts[0]);
        contract = new ethers.Contract(contractAddress, abi, signer);
        console.log(contract);
    });
});

async function signDocument() {
    try {
        const tx = await contract.signDocument();
        await tx.wait();
        const resultElement = document.getElementById("result");
        resultElement.innerHTML = "Document signed successfully!";
        console.log("Document signed successfully!");
    } catch (error) {
        const resultElement = document.getElementById("result");
        resultElement.innerHTML = `Error: ${error.data.message}`;
        console.error(error);
    }
};

async function getDocumentHash() {
    try {
        const hash = await contract.getDocumentHash();
        const resultElement = document.getElementById("result");
        resultElement.innerHTML = `Current text: ${hash}`;
    } catch (error) {
        console.error(error);
    }
};

async function addToWhitelist(addressToAdd) {
    try {
        const tx = await contract.addToWhitelist([addressToAdd]);
        await tx.wait();
        const resultElement = document.getElementById("result");
        resultElement.innerHTML = `Added ${addressToAdd} to the whitelist`;
        console.log(`Added ${addressToAdd} to the whitelist`);
    } catch (error) {
        console.error(error);
    }
};

async function setDocumentHash(hash) {
    try {
        const tx = await contract.setDocumentHash(hash);
        await tx.wait();
        const resultElement = document.getElementById("result");
        resultElement.innerHTML = `Document hash set to ${hash}`;
    } catch (error) {
        console.error(error);
    }
};

async function getWhitelist() {
    try {
        const whitelist = await contract.getWhitelist();
        const resultElement = document.getElementById("result");
        resultElement.innerHTML = `Whitelist: ${whitelist.join(", ")}`;
        console.log(whitelist);
    } catch (error) {
        const resultElement = document.getElementById("result");
        resultElement.innerHTML = `Error: ${error.data.message}`;
        console.error(error);
    }
};

async function hasSignedDocument(address) {
    try {
        const hasSigned = await contract.hasSignedDocument(address);
        const resultElement = document.getElementById("result");
        console.log(whitelist);
    } catch (error) {
        const resultElement = document.getElementById("result");
        console.error(error);
    }
};

async function isDocumentSigned() {
    try {
        const hasSigned = await contract.isDocumentSigned();
        const resultElement = document.getElementById("result");
        resultElement.innerHTML = `Text ${hasSigned ? "is" : "is not"} signed.`;

    } catch (error) {
        console.error(error);
    }
};

// Switch to BSC Testnet
switchNetwork('0x61');
