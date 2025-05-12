# module federation reproduction example

This reproduction example explains how it's not possible to have a dependency tree as the follows:

![](./dependencytree.png)

This seems to fail because "mfe_2" cannot be initialized both from the host app and from "mfe_1", and loaded from both places, but treating it as a single micro-frontend.

## Run locally

To run execute these commands:

```
pnpm install
pnpm run -r --parallel dev
```

Will create three servers (only host one can be accessed through the browser)

- <http://localhost:1000> -> host
- <http://localhost:1001> -> mfe-1
- <http://localhost:1002> -> mfe-2
