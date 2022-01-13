// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.6;

import "ds-test/test.sol";

import "./DemoErc721a.sol";

contract DemoErc721aTest is DSTest {
    DemoErc721a a;

    function setUp() public {
        a = new DemoErc721a();
    }

    function testFail_basic_sanity() public {
        assertTrue(false);
    }

    function test_basic_sanity() public {
        assertTrue(true);
    }
}
