# OpenSea plugin

This is an app plugin for the [Ethereum application](https://github.com/LedgerHQ/app-ethereum) on Ledger Nano S and X cold-storage devices.

The plugin improves displayed information on Nano screen devices to a human readable format, which improves security by informing the user of transaction data.

## OpenSea interface

Most transactions emitted on Ethereum by an OpenSea user come from the [OpenSea V2 contract](https://etherscan.io/address/0x7f268357A8c2552623316e2562D90e642bB538E5) (some cancelOrder transactions might remain from the [OpenSea V1 contract](https://etherscan.io/address/0x7be8076f4ea4a4ad08075c2508e481d6c946d12b)).

### The plugin supports:

- CancelOrder_ method.
- AtomicMatch_ method.
- RegisterProxy (method from a different contract: [OpenSea: Registry](https://etherscan.io/address/0xa5409ec958c83c3f309868babaca7c86dcb077c1)).

### Not supported:

- SetApprovalForAll (specific to collection contract, needed to allow OpenSea to "spend" user's NFT's meaning to transfer them once sale is triggered).
- ProxyAssert (specific to collection contract, used to transfer several items from one owner to an other. (Not a sale)).

- Many interactions on the OpenSea platform require solely a signature from the Ledger device: Creating a collection, placing a bid, putting an item on sale, lowering said sale-price.

## Setting up the dev environment

Prepare the dev environment by following this [guide](https://developers.ledger.com/docs/dapp/nano-plugin/environment-setup/).

## Compilation

*Note: The ethereum app should be on the "develop" branch.*

To compile: `make DEBUG=10`

This plugin uses the [ethereum-plugin-sdk](https://github.com/LedgerHQ/ethereum-plugin-sdk.git). If there's an error while building, try running `git pull --recurse-submodules` in order to update the sdk. If this fixes your bug, please file an issue or create a PR to add the new sdk version 🙂

If you need to update the sdk, you will need to do it locally and create a PR on the ethereum-plugin-sdk repo.

## Testing

### ZEMU

Set the testing environment with this [walkthrough](https://developers.ledger.com/docs/dapp/nano-plugin/environment-setup/)

The tests consist of screenshots being compared and having to match a set of correct screenshots located in the `opensea-plugin/tests/snapshots` directory.

To run the tests:

`cd opensea-plugin/tests/`

Once in the appropriate directory, simply run `yarn test` to run all tests.

<b>OR</b>

`yarn test -t NAME_OF_TEST` where NAME_OF_TEST is the string associated to the singular test name.

The name of the singular tests may be found in `opensea-plugin/tests/src/*.test.js.`

## Documentation

For more information about how the plugin and tester works visit the [plugin documentation page](https://developers.ledger.com/docs/dapp/nano-plugin/overview/).
