# Text Singer
## This is app made for study purpose and has some magor bags.

This is a Solidity smart contract that allows users to sign a document and verify its authenticity. The smart contract maintains a whitelist of addresses that are allowed to sign the document. When an address signs the document, the signature is recorded in a mapping. If all addresses in the whitelist have signed the document, the contract considers the document signed.