// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract DemoErc721 is ERC721Enumerable {

    uint256 maxBatchSize = 0;

    constructor(uint256 _maxBatchSize) ERC721("Chibi Shinobis", "ChibiShinobis") {
        require(_maxBatchSize > 0, "must set maxBatchSize");
        maxBatchSize = _maxBatchSize;
    }

    function mint(address to, uint256 quantity) public {
        require(quantity <= maxBatchSize, "cannot mint more than maxBatchSize");
        for (uint256 i = 0; i < quantity; i++) {
            _safeMint(to, totalSupply());
        }
    }
}
