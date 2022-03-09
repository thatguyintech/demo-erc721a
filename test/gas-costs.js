const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("OpenZeppelin ERC721Enumerable", function () {
    it(`can batch mint`, async function () {
        for (var i = 1; i < 6; i++) {
            // Initialize the OpenZeppelin Contract with maxBatchSize of 5.
            const erc721 = await initializeContract("DemoErc721", 5);

            // Simulate a user wallet.
            const [_, addr1] = await ethers.getSigners();

            // Batch mint and log gas cost for the batch.
            await mintAndLogGas(erc721, addr1, i);
        }
    });

    it(`cannot mint more than maxBatchSize`, async function () {
        // Initialize the OpenZeppelin Contract.
        const erc721 = await initializeContract("DemoErc721", 5);

        // Simulate a user wallet.
        const [_, addr1] = await ethers.getSigners();

        // Expect error when minting more than maxBatchSize.
        let assertionError = false;
        try {
            await mintAndLogGas(erc721, addr1, 6);
        } catch (AssertionError) {
            assertionError = true;
        } finally {
            expect(assertionError).to.be.true;
        }
    })

    it(`can transfer nth token after minting a batch of i`, async function() {
        for (var i = 1; i < 6; i++) {
            for (var n = i-1; n > -1; n--)  {
                // Initialize the OpenZeppelin Contract with maxBatchSize of i.
                const erc721 = await initializeContract("DemoErc721", i);

                // Simulate a user wallet.
                const [_, addr1] = await ethers.getSigners();

                // Batch mint i then transfer the nth token.
                await mintAndTransfer(erc721, addr1, i, n);
            }
        }
    })
});

describe("Azuki ERC721A", async function () {
    it(`can batch mint`, async function () {
        for (var i = 1; i < 6; i++) {
            // Initialize the Azuki Contract.
            const erc721a = await initializeContract("DemoErc721a", 5);

            // Simulate a user wallet.
            const [_, addr1] = await ethers.getSigners();

            // Batch mint and log gas costs.
            await mintAndLogGas(erc721a, addr1, i);
        }
    });

    it(`cannot mint more than maxBatchSize`, async function () {
        // Initialize the Azuki Contract.
        const erc721a = await initializeContract("DemoErc721a", 5);

        // Simulate a user wallet.
        const [_, addr1] = await ethers.getSigners();

        // Expect error when minting more than maxBatchSize.
        let assertionError = false;
        try {
            await mintAndLogGas(erc721a, addr1, 6);
        } catch (err) {
            assertionError = true;
        } finally {
            expect(assertionError).to.be.true;
        }
    })

    it(`can transfer nth token after minting a batch of i`, async function() {
        for (var i = 1; i < 6; i++) {
            for (var n = i-1; n > -1; n--)  {
                // Initialize the OpenZeppelin Contract with maxBatchSize of i.
                const erc721a = await initializeContract("DemoErc721a", 5);

                // Simulate a user wallet.
                const [_, addr1] = await ethers.getSigners();

                // Batch mint i then transfer the nth token.
                await mintAndTransfer(erc721a, addr1, i, n);
            }
        }
    })
});

const initializeContract = async (contract, maxBatchSize) => {
    const ERC721 = await ethers.getContractFactory(contract);
    const erc721 = await ERC721.deploy(maxBatchSize);
    
    return erc721;
}

const mintAndLogGas = async (contract, account, quantity) => {
    const mint = await contract.connect(account).mint(account.address, quantity);
    const mintTxnResponse = await mint.wait();
    console.log(`\tgas to mint ${quantity}:`, mintTxnResponse.gasUsed.toString());
}

const mintAndTransfer = async (contract, account, quantity, tokenId) => {
    const mintTx = await contract.connect(account).mint(account.address, quantity);
    await mintTx.wait();

    const transferTx = await contract.connect(account)["safeTransferFrom(address,address,uint256)"](account.address, "0x000000000000000000000000000000000000dEaD", tokenId);
    const transferReceipt = await transferTx.wait();
    console.log(`\tminted ${quantity}, transfered id: ${tokenId}, cost: ${transferReceipt.gasUsed.toString()}`);
}
