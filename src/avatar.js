import blockies from 'ethereum-blockies-png'
import superagent from 'superagent'
import { serverConfig } from '@/config'

const getBlockie = address => blockies.createDataURL({ seed: address, scale: 32 })
const avatarUrl = _address => {
  const {server, bucket} = serverConfig
  const timeStamp = Date.now().toString().substring(0, 8)
  return `${server}/${bucket}/${_address.toLowerCase()}?t=${timeStamp}`
}

// This solve the problem!
// @author: Jon Leighton
// Originated in https://gist.github.com/jonleighton/958841
function arrayBufferDataUri (raw) {
  var base64 = ''
  var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

  var bytes = new Uint8Array(raw)
  var byteLength = bytes.byteLength
  var byteRemainder = byteLength % 3
  var mainLength = byteLength - byteRemainder

  var a, b, c, d
  var chunk

  // Main loop deals with bytes in chunks of 3
  for (var i = 0; i < mainLength; i = i + 3) {
    // Combine the three bytes into a single integer
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

    // Use bitmasks to extract 6-bit segments from the triplet
    a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
    b = (chunk & 258048) >> 12 // 258048   = (2^6 - 1) << 12
    c = (chunk & 4032) >> 6 // 4032     = (2^6 - 1) << 6
    d = chunk & 63 // 63       = 2^6 - 1
    // Convert the raw binary segments to the appropriate ASCII encoding
    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
  }

  // Deal with the remaining bytes and padding
  if (byteRemainder === 1) {
    chunk = bytes[mainLength]

    a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2
    // Set the 4 least significant bits to zero
    b = (chunk & 3) << 4 // 3   = 2^2 - 1
    base64 += encodings[a] + encodings[b] + '=='
  } else if (byteRemainder === 2) {
    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

    a = (chunk & 16128) >> 8 // 16128 = (2^6 - 1) << 8
    b = (chunk & 1008) >> 4 // 1008  = (2^6 - 1) << 4
    // Set the 2 least significant bits to zero
    c = (chunk & 15) << 2 // 15    = 2^4 - 1
    base64 += encodings[a] + encodings[b] + encodings[c] + '='
  }

  return 'data:image/jpeg;base64,' + base64
}

export async function getAvatar (_address) {
  const url = avatarUrl(_address.toLowerCase())
  var imageUrl
  try {
    const response = await superagent
      .get(url)
      .responseType('arraybuffer')
    imageUrl = arrayBufferDataUri(response.body)
  } catch (err) {
    console.warn('Seems you don\'t have Dravatar or Network is terrible, swtiching to identicon')
    imageUrl = getBlockie(_address)
  }
  return imageUrl
}
