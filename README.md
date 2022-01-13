Using [dapptools](https://github.com/dapphub/dapptools) to measure relative gas costs for

* OpenZeppelin ERC721Enumerable, vs.
* Azuki ERC721A

## _safeMint()

Running 5 tests for src/DemoErc721.t.sol:DemoErc721Test
[PASS] testMint_1() (gas: 126296)
[PASS] testMint_2() (gas: 242011)
[PASS] testMint_3() (gas: 357769)
[PASS] testMint_4() (gas: 473482)
[PASS] testMint_5() (gas: 589175)

Running 5 tests for src/DemoErc721a.t.sol:DemoErc721aTest
[PASS] testMint_1() (gas: 75981)
[PASS] testMint_2() (gas: 78483)
[PASS] testMint_3() (gas: 81028)
[PASS] testMint_4() (gas: 83528)
[PASS] testMint_5() (gas: 86008)

These results line up very closely with the blog post: https://www.azuki.com/erc721a

## transferFrom()

tbd

... if anyone knows the answer to this question:

https://ethereum.stackexchange.com/questions/118808/while-writing-a-test-using-dapptools-how-do-i-send-a-transaction-as-a-specific

it would help me a lot