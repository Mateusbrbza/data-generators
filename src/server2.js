// curl -X POST "localhost:8080/cart" --data '{"id": "123"}'
import { createServer } from "http";
import { once } from "node:events";

const PORT = 8080;
async function handler(request, response) {
    if(request.method === 'POST' && request.url.includes('cart')) {
      const data = await once(request, 'data')
      const item = JSON.parse(data)
      console.log('received', item)

      return response.end(`process succeeded from ${item.id}`)
    }

  return response.end(`hey!`);
}

createServer(handler)
  .listen(PORT)
  .on("listening", () => {
    console.log(`cart API is running at ${PORT}`);
  });
