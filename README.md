# ERC721Enumerable vs ERC721A 

In this repo, we are going to be using [Hardhat](https://hardhat.org/) to measure
relative gas costs for:

* OpenZeppelin `ERC721Enumerable`, vs.
* Azuki `ERC721A`

And then deploying a sample ERC721A contract using [Alchemy](https://www.alchemy.com/)

---

## If you want to run this code yourself:

1. `git clone git@github.com:thatguyintech/demo-erc721a.git`
2. `npm install`
3. `npx hardhat test`

## Let's dig in. First..

- [x] Validate the [blog post](https://www.azuki.com/erc721a)
    - mint 1 piece up to 5 pieces (batch)
    - compare gas costs

- [ ] Check how much other functions cost
    - `transferFrom`
    - `setApprovalForAll`

- [ ] Take a break and reflect on life

## Then..

- [ ] Create a new contract that inherits from the ERC721A contract
    - Deploy to Rinkeby! Use the [Rinkeby Faucet](https://RinkebyFaucet.com).

- [ ] Build a frontend site that displays the gas costs when a user mints