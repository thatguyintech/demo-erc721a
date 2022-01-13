// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.6;

import "ds-test/test.sol";

import "./DemoErc721.sol";

contract DemoErc721Test is DSTest {

    DemoErc721 a;
    address testWallet = address(0x7E67aF7FF72cb87b7B0100cA8128F4673D185234);
    address testWallet2 = address(0x7E67af7FF72Cb87B7b0100ca8128f4673D185235);

    function setUp() public {
        a = new DemoErc721();
    }

    function mintMultiple(uint256 numToMint) public {
        a.mint(testWallet, numToMint);
        assertEq(a.balanceOf(testWallet), numToMint);
    }

    function testMint_1() public {
        mintMultiple(1);
    }
    function testMint_2() public {
        mintMultiple(2);
    }
    function testMint_3() public {
        mintMultiple(3);
    }
    function testMint_4() public {
        mintMultiple(4);
    }
    function testMint_5() public {
        mintMultiple(5);
    }

    // function testTransfer() public {
    //     mintMultiple(1);
    //     a.transferFrom(testWallet, testWallet2, 1);
    // }
}
