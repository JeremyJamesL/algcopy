# Algcopy

Copy an index and all its settings between [Algolia](https://algolia.com) applications.

Ensure that the destination index does not exist, otherwise the copy will fail.

## Getting started

Install globally

```console
npm install -g algcopy
```

Execute without installation

```console
npx algcopy // Add flags
```

## Example usage

This will copy all records, settings and settings in an index from one app to another

```console
algcopy --app1 <APP1ID> --app2 <APP2ID> --key1 <KEY1> --key2 <KEY2> --index1 sourcIndex --index2 destinationIndex
```

## Commands and flags

### Help

Show CLI help information

```console
algcopy help
```

This uses Algolia's `copyIndex` method under the hood, which has certain restrictions liste [here](https://www.algolia.com/doc/api-reference/api-methods/copy-index/#destination-indices), namely:

- You can’t copy an index between two Algolia applications, if the destination index exists.
- You can’t copy to a destination index that already has replicas.
