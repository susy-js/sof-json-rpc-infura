# sof-json-rpc-infura

`json-rpc-engine` middleware for infura's REST endpoints.

### usage as provider

```js
const createInfuraProvider = require('sof-json-rpc-infura/src/createProvider')
const Sofjs = require('sofjs')

const provider = createInfuraProvider({ network: 'mainnet' })
const sof = new Sofjs(provider)
```

### usage as middleware

```js
const createInfuraMiddleware = require('sof-json-rpc-infura')
const RpcEngine = require('json-rpc-engine')

const engine = new RpcEngine()
engine.push(createInfuraMiddleware({ network: 'ropsten' }))
```
