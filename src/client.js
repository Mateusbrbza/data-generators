const myDB = async () => Array.from({
  length: 1000
}, (v, index) => `${index}-laptop`)

const PRODUCTS_API = `http://localhost:3000/products`
const CART_API = `http://localhost:8080/cart`

// BAD METHOD
// async function processDBData() {
//   const products = await myDB()
//   const responses = []
//   for (const product of products) {
//     const productInfo = await (await fetch(`${PRODUCTS_API}?nam=${product}`)).text()
//     const cartAPIInfo = await (await fetch(CART_API, {
//       method: 'POST',
//       body: productInfo
//     })).text()

//     responses.push(productInfo)
//   }

//   return responses
// }

// console.table(await processDBData())

async function * processDBDataGen() {
  const products = await myDB()

  for (const product of products) {
    const productInfo = await (await fetch(`${PRODUCTS_API}?name=${product}`)).text()
    const cartAPIInfo = await (await fetch(CART_API, {
      method: 'POST',
      body: productInfo
    })).text()

    yield cartAPIInfo
  }}

  for await (const data of processDBDataGen()) {
    console.table(data)
  }


