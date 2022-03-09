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
});

const initializeContract = async (contract, maxBatchSize) => {
    const ERC721 = await ethers.getContractFactory(contract);
    const erc721 = await ERC721.deploy(maxBatchSize);
    
    return erc721;
}

const mintAndLogGas = async (contract, account, quantity) => {
    const mint = await contract.connect(account).mint(account.address, quantity);
    const mintTxnResponse = await mint.wait();
    console.log(`\tgas to mint ${quantity}`, mintTxnResponse.gasUsed.toString());
}
