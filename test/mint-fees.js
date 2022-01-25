const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OpenZeppelin ERC721 Enumerable", function () {
    it(`cost to mint `, async function () {
        for (var i = 1; i < 6; i++) {
            const ERC721 = await ethers.getContractFactory("DemoErc721");
            const erc721 = await ERC721.deploy();

            const [_, addr1] = await ethers.getSigners();
            
            const mint = await erc721.connect(addr1).mint(addr1.address, i);
            const mintTxnResponse = await mint.wait();
            console.log(`gas to mint ${i}`, mintTxnResponse.gasUsed.toString());
        }
    });
});

describe("Azuki ERC721A", async function () {
    it(`cost to mint `, async function () {
        for (var i = 1; i < 6; i++) {
            const ERC721 = await ethers.getContractFactory("DemoErc721a");
            const erc721 = await ERC721.deploy();

            const [_, addr1] = await ethers.getSigners();
            
            const mint = await erc721.connect(addr1).mintA(addr1.address, i);
            const mintTxnResponse = await mint.wait();
            console.log(`gas to mint ${i}`, mintTxnResponse.gasUsed.toString());
        }
    });
});