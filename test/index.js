const test = require('tape')
const { fetchConfigFromReq } = require('../src/index')

test('fetchConfigFromReq - basic', (t) => {

  const network = 'mainnet'
  const req = {
    method: 'sof_getBlockByNumber',
    params: ['0x482103', true],
  }

  const { fetchUrl, fetchParams } = fetchConfigFromReq({ network, req, source:'sof-json-rpc-infura' })
  t.equals(fetchUrl, 'https://api.infura.io/v1/jsonrpc/mainnet/sof_getBlockByNumber?params=%5B%220x482103%22%2Ctrue%5D')
  t.deepEquals(fetchParams, { 
    method: 'GET',     
    headers: {
    'Infura-Source': 'sof-json-rpc-infura/internal'
    }, 
  })
  t.end()

})

test('fetchConfigFromReq - basic: no source specified', (t) => {

  const network = 'mainnet'
  const req = {
    method: 'sof_getBlockByNumber',
    params: ['0x482103', true],
  }

  const { fetchUrl, fetchParams } = fetchConfigFromReq({ network, req })
  t.equals(fetchUrl, 'https://api.infura.io/v1/jsonrpc/mainnet/sof_getBlockByNumber?params=%5B%220x482103%22%2Ctrue%5D')
  t.deepEquals(fetchParams, { 
    method: 'GET',
  })
  t.end()

})


test('fetchConfigFromReq - basic', (t) => {

  const network = 'ropsten'
  const req = {
    method: 'sof_sendRawTransaction',
    params: ['0x0102030405060708090a0b0c0d0e0f'],
  }

  const { fetchUrl, fetchParams } = fetchConfigFromReq({ network, req, source:'sof-json-rpc-infura' })
  t.equals(fetchUrl, 'https://api.infura.io/v1/jsonrpc/ropsten')
  t.deepEquals(fetchParams, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Infura-Source': 'sof-json-rpc-infura/internal'
    },
    body: JSON.stringify(req),
  })
  t.end()

})


test('fetchConfigFromReq - strip non-standard keys', (t) => {

  const network = 'ropsten'
  const req = {
    method: 'sof_sendRawTransaction',
    params: ['0x0102030405060708090a0b0c0d0e0f'],
    origin: 'happydapp.sof',
  }

  const { fetchUrl, fetchParams } = fetchConfigFromReq({ network, req })
  t.equals(fetchUrl, 'https://api.infura.io/v1/jsonrpc/ropsten')
  const parsedReq = JSON.parse(fetchParams.body)
  t.notOk('origin' in parsedReq, 'non-standard key removed from req')
  t.end()

})

test('fetchConfigFromReq - source specified for request origin in header', (t) => {

  const network = 'ropsten'
  const req = {
    method: 'sof_sendRawTransaction',
    params: ['0x0102030405060708090a0b0c0d0e0f'],
    origin: 'happydapp.sof',
  }

  const { fetchUrl, fetchParams } = fetchConfigFromReq({ network, req, source:'sof-json-rpc-infura' })
  t.equals(fetchUrl, 'https://api.infura.io/v1/jsonrpc/ropsten')
  t.deepEquals(fetchParams, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Infura-Source': 'sof-json-rpc-infura/happydapp.sof'
    },
    body: fetchParams.body,
  })
  t.end()

})
