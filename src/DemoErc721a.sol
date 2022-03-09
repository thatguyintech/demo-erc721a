// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.6;

import "./ERC721A.sol";

contract DemoErc721a is ERC721A {
    constructor(uint256 _maxBatchSize) ERC721A("Chibi Shinobis", "ChibiShinobis", _maxBatchSize) {}

    function mint(address to, uint256 quantity) public {
        _safeMint(to, quantity);
    }
}
