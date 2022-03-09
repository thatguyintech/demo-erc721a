# ERC721Enumerable vs ERC721A 

In this repo, we are going to be using [Hardhat](https://hardhat.org/) to measure
relative gas costs for:

* OpenZeppelin `ERC721Enumerable`, vs.
* Azuki `ERC721A`

And then deploying a sample ERC721A contract using [Alchemy](https://www.alchemy.com/)

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


OpenZeppelin ERC721Enumerable
	gas to mint 1 104138
	gas to mint 2 219626
	gas to mint 3 335114
	gas to mint 4 450602
	gas to mint 5 566090

Azuki ERC721A
	gas to mint 1 93704
	gas to mint 2 96212
	gas to mint 3 98720
	gas to mint 4 101228
	gas to mint 5 103736
```

You can see from the above results that the findings in the original 
Azuki ERC721A blog post are true. Batch-minting 5 pieces using the ERC721A
implementation costs around the same (or less!) compared to batch minting
only 1 piece using the ERC721Enumerable implementation.

Pretty cool stuff.

However, I also wanted to know if there are any downsides to using ERC721A,
and indeed there are some negative tradeoffs:

After a user batch mints some NFTs, depending on which tokenId they subsequently
transfer, the gas costs may increase linearly.

```
thatguyintech@albert demo-erc721a % npx hardhat test


OpenZeppelin ERC721Enumerable
	minted 1, transfered id: 0, cost: 69655
	minted 2, transfered id: 1, cost: 90367
	minted 2, transfered id: 0, cost: 95210
	minted 3, transfered id: 2, cost: 90367
	minted 3, transfered id: 1, cost: 100822
	minted 3, transfered id: 0, cost: 95210
	minted 4, transfered id: 3, cost: 90367
	minted 4, transfered id: 2, cost: 100822
	minted 4, transfered id: 1, cost: 100822
	minted 4, transfered id: 0, cost: 95210
	minted 5, transfered id: 4, cost: 90367
	minted 5, transfered id: 3, cost: 100822
	minted 5, transfered id: 2, cost: 100822
	minted 5, transfered id: 1, cost: 100822
	minted 5, transfered id: 0, cost: 95210

Azuki ERC721A
	minted 1, transfered id: 0, cost: 71355
	minted 2, transfered id: 1, cost: 91197
	minted 2, transfered id: 0, cost: 92043
	minted 3, transfered id: 2, cost: 93927
	minted 3, transfered id: 1, cost: 111885
	minted 3, transfered id: 0, cost: 92043
	minted 4, transfered id: 3, cost: 96657
	minted 4, transfered id: 2, cost: 114615
	minted 4, transfered id: 1, cost: 111885
	minted 4, transfered id: 0, cost: 92043
	minted 5, transfered id: 4, cost: 99387
	minted 5, transfered id: 3, cost: 117345
	minted 5, transfered id: 2, cost: 114615
	minted 5, transfered id: 1, cost: 111885
	minted 5, transfered id: 0, cost: 92043
```

translated to an table for legibility:

(read x-axis then y-axis, for example: `"Mint 1 then transfer tokenId 0"` or `"Mint 4 then transfer tokenId 3"`)

OpenZeppelin ERC721Enumerable:
|       | Mint 1 | Mint 2 | Mint 3 | Mint 4 | Mint 5 |
| ----- | ------ | ------ | ------ | ------ | ------ |
| t0    | 69655  |95210   |95210   |95210   |95210   |
| t1    |        |90367   |100822  |100822  |100822  |
| t2    |        |        |90367   |100822  |100822  |
| t3    |        |        |        |90367   |100822  |
| t4    |        |        |        |        |90367   |

Azuki ERC721A:
|       | Mint 1 | Mint 2 | Mint 3 | Mint 4 | Mint 5 |
| ----- | ------ | ------ | ------ | ------ | ------ |
| t0    | 71355  |92043   |92043   |92043   |92043   |
| t1    |        |91197   |111885  |111885  |117345  |
| t2    |        |        |93927   |114615  |114615  |
| t3    |        |        |        |96657   |111885  |
| t4    |        |        |        |        |99387   |

We can see that the cost to mint higher-numbered tokenIDs 
increases when the original batch mint size increases.

Although it sucks to see this linear cost increase for transfers
solely based on which tokenID you want to transfer, there is 
a workaround:

https://twitter.com/fulldecent/status/1491506122565595141?s=20&t=rystKohzG5MkxONXxxvFxA

> 1. Always mint the maximum allowed
> 2. Transfer out your ODD numbered tokens first in ascending order
> 3. Then transfer out your EVEN numbered tokens

Also, for most people, the impact of ERC721A on transfer might not matter too much.
The mint function is much more important because it is the first impression that
people have of the project.

If the fees are high, they will be sad. If the fees are low, they will be happy.

Transfers are rare and only happen every once in a while.

## TODO..

- [ ] Create a new contract that inherits from the ERC721A contract
    - Deploy to Rinkeby! Use the [Rinkeby Faucet](https://RinkebyFaucet.com).

- [ ] Build a frontend site that displays the gas costs when a user mints