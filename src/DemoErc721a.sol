// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.6;

import "./ERC721A.sol";

contract DemoErc721a is ERC721A {
    constructor() ERC721A("Chibi Shinobis", "ChibiShinobis", 5) {}

    function mintA(address to, uint256 quantity) public {
        _safeMint(to, quantity);
    }
}
