#! /usr/bin/env node
import txFromEtherscan, { getHexLen } from "./txFromEtherscan.js"
// const rawTx = '0x02f87001138459682f0085103743e1af8307e31394a5409ec958c83c3f309868babaca7c86dcb077c18084ddd81f82c001a0ac03b62363de842c8afe05d632ab797f2c4d4dadca670586a2ec9515f97d6379a004b94348bb042f63b4581d8e2a3c03058c5f3f67d9d4e80d36fd6b73c54e48be'
// const cancelOrderTx = '0x02f90514018202c68459682f00851968d2107c830124a2947be8076f4ea4a4ad08075c2508e481d6c946d12b80b904a4a8a41c700000000000000000000000007be8076f4ea4a4ad08075c2508e481d6c946d12b000000000000000000000000dd21baa82528e251b24f8d10493b14eb7690b2d200000000000000000000000000000000000000000000000000000000000000000000000000000000000000005b3256965e7c3cf26e11fcaf296dfc8807c010730000000000000000000000007645eec8bb51862a5aa855c40971b2877dae81af0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002ee0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004563918244f4000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000061224b640000000000000000000000000000000000000000000000000000000000000000c1a08f2a055c6bb246a55042670f2d496bb2249210db179dcc7358b4090666b30000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000034000000000000000000000000000000000000000000000000000000000000003e00000000000000000000000000000000000000000000000000000000000000480000000000000000000000000000000000000000000000000000000000000001bbb51a20a1210483592e0bf92c61e111fc8f44f17d27bb25184fed5005d8b2a0c1ced75e3b1b29e16f6a830c9680cb0d41b5ac84e07be88518d2f1a5006f25461000000000000000000000000000000000000000000000000000000000000006423b872dd000000000000000000000000dd21baa82528e251b24f8d10493b14eb7690b2d2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004e5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c001a0ede1b1154544155ff4d9a6edf8a0b66b205fa4bc61c826fe097d2f4f16613327a0112d9ed8838285a5895cdadca800aa846f6304b5a55c99da4687ce781ff6d704'
// const target = 'E004000040048000002C8000003C800000000000000002ED01138459682F0085103743E1AF8307E31394A5409EC958C83C3F309868BABACA7C86DCB077C18084DDD81F82C0'

if (!process.argv[2]) {
	console.log("plz enter a raw Tx.")
	process.exit(1)
}

const inputedTx = process.argv[2]
const APDU_MAX = 150

/* Prepend the raw data with ... */
const parsed = '048000002C8000003C8000000000000000' + txFromEtherscan(inputedTx).toUpperCase()
let len = parsed.length / 2
if (len > APDU_MAX) len = APDU_MAX
const hexLen = len.toString(16)

/* Split into 300 byte chunks */
const splited = parsed.match(/.{1,300}/g)

let res = []
splited.forEach((line, index) => {
	/* First */
	if (index === 0)
		res.push(`E0040000${hexLen}${line}`)
	/* Last */
	else if (index === (splited.length - 1))
		res.push(`E004000${getHexLen(line)}${line}`)
	/* Between */
	else res.push(`E004800096${line}`)
})

/* Output result */
console.log("Ouput:")
res.forEach(elem => console.log(elem))