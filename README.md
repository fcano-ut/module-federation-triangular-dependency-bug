# module federation setup

Run:

```
$ pnpm install
$ pnpm run -r --parallel dev
```

Will create three servers (only host one can be accessed through the browser)

- http://localhost:1000 -> host
- http://localhost:1001 -> mfe-1
- http://localhost:1002 -> mfe-2
