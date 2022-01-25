# Welcome

In this repo, we are going to be using [Hardhat](https://hardhat.org/) to measure
relative gas costs for:

* OpenZeppelin ERC721Enumerable, vs.
* Azuki ERC721A

And then deploying a sample ERC721A contract using [Alchemy](https://www.alchemy.com/)

---

First:

1. Validate the [blog post](https://www.azuki.com/erc721a)
- mint 1 piece, 2 pieces, 3 pieces, 4 pieces, and 5 pieces
- compare gas costs

2. Check how much other functions cost
- `transferFrom`
- `setApprovalForAll`

3. Take a break and reflect on life

Then:

4. Create a new contract that inherits from the ERC721A contract
- Deploy to Rinkeby!

5. Build a frontend site that displays the gas costs when a user mints