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

```
thatguyintech@albert demo-erc721a % npx hardhat test


  OpenZeppelin ERC721 Enumerable
    gas to mint 1 142006
    gas to mint 2 257688
    gas to mint 3 373370
    gas to mint 4 489052
    gas to mint 5 604734
    ✓ cost to mint  (736ms)

  Azuki ERC721A
    gas to mint 1 93704
    gas to mint 2 96212
    gas to mint 3 98720
    gas to mint 4 101228
    gas to mint 5 103736
    ✓ cost to mint  (165ms)
```

You can see from the above results that the findings in the original 
Azuki ERC721A blog post are true. Batch-minting 5 pieces using the ERC721A
implementation costs around the same (or less!) compared to batch minting
only 1 piece using the ERC721Enumerable implementation.

Pretty cool stuff.

- [ ] Check how much other functions cost
    - `transferFrom`
    - `setApprovalForAll`

- [ ] Take a break and reflect on life

## Then..

- [ ] Create a new contract that inherits from the ERC721A contract
    - Deploy to Rinkeby! Use the [Rinkeby Faucet](https://RinkebyFaucet.com).

- [ ] Build a frontend site that displays the gas costs when a user mints