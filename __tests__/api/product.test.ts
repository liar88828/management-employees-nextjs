import { describe, expect, test } from 'vitest';
import { productExample } from "../../src/assets/product.example";
import { productAll, productCreate, productDelete, productId, productUpdate } from "../../src/server/network/product";

const json = structuredClone(productExample)

let contextId = 'c46a1226-9ec9-4d37-8b38-4d284e237264'

const responseSuccess = {
  "code": expect.any(Number),
  "data": {
    "id": expect.any(String),
    "price": expect.any(Number),
    "img": "kosong",
    "type": "kosong",
    "desc": "kosong",
    "location": "kosong",
    "name": "kosong",
    "created_at": expect.any(String),
    "updated_at": expect.any(String),
  },
  "msg": expect.any(String),
}

const responseErrorAll = {
  "error": [
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "Required",
      "path": [
        "location",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "Required",
      "path": [
        "name",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "number",
      "message": "Required",
      "path": [
        "price",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "Required",
      "path": [
        "img",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "Required",
      "path": [
        "type",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "number",
      "message": "Required",
      "path": [
        "qty",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "Required",
      "path": [
        "desc",
      ],
      "received": "undefined",
    },
  ],
  "msg": "Error on POST",
}

const responseErrorAllUpdate = {
  'msg': expect.any(String),
  'code': 400,
  "error": [
    // {
    //   "code": "invalid_type",
    //   "expected": "string",
    //   "message": "Required",
    //   "path": [
    //     "id",
    //   ],
    //   "received": "undefined",
    // },
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "Required",
      "path": [
        "location",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "Required",
      "path": [
        "name",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "number",
      "message": "Required",
      "path": [
        "price",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "Required",
      "path": [
        "img",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "Required",
      "path": [
        "type",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "number",
      "message": "Required",
      "path": [
        "qty",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "Required",
      "path": [
        "desc",
      ],
      "received": "undefined",
    },
  ],
}

const responseErrorPartial = {
  "code": 400,
  "error": [
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "Required",
      "path": [
        "name",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "Required",
      "path": [
        "img",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "number",
      "message": "Required",
      "path": [
        "qty",
      ],
      "received": "undefined",
    },
  ],
  "msg": expect.any(String),
}

const responseErrorID = {
  "code": 400,
  "error":
    [
      {
        "code": "invalid_string",
        "message": "Invalid uuid",
        "path": [],
        "validation": "uuid",
      },
    ],
  "msg": expect.any(String),
}

describe.skip("Test Product", () => {
  // --------
  describe( "POST Product", () => {
    test( "Product Can create a post success ", async () => {
        const data = productCreate(json,)
      contextId = await data.then(d => d.data.id)
      await expect(data).resolves.toHaveProperty("data.name", "kosong")
      await expect(data).resolves.toMatchObject(responseSuccess)
      
      // await expect( data ).resolves.toMatchObject( successResponse( json, "POST" ) )
    } )

    test( "Product cannot create partial value ", async () => {
      const { name, qty, img, ...ress } = json
        const data = productCreate(ress,)
      await expect(data).resolves.not.toHaveProperty("data.name", "kosong")
        // await expect(data).resolves.not.toContain(statusTest("POST", 'product'))
      await expect(data).resolves.toMatchObject(responseErrorPartial)
      
    } )

    test( "Product cannot create empty value ", async () => {
        const data = productCreate({},)
      await expect(data).resolves.not.toHaveProperty("data.name", "kosong")
        // await expect(data).resolves.not.toContain(statusTest("POST", "product"))
      await expect(data).resolves.toMatchObject(responseErrorAll)
    } )
  } )
  
  describe("GET Product", () => {
    test( "Product Can find by all ", async () => {
      // const data = getDashboard()
        const data = productAll("product")
      await expect(data).resolves.toMatchObject({ "msg": expect.any(String) })
      await expect(data).resolves.toMatchObject({ "code": 200 })
      await expect(data).resolves.toMatchObject({ "data": expect.any(Object) })
      await expect(data).resolves.toHaveProperty("data")
      await expect(data).resolves.toHaveProperty("code")
      await expect(data).resolves.toHaveProperty("msg",)
      // await expect(data).resolves.toHaveProperty("data[0].price",)
      // await expect( data ).resolves.toHaveProperty( "data[0].img", )
      // await expect(data).resolves.toHaveProperty("data[0].type",)
      // await expect(data).resolves.toHaveProperty("data[0].location",)
      // await expect(data).resolves.toHaveProperty("data[0].desc",)
      // await expect(data).resolves.toHaveProperty("data[0].id",)
      // await expect(data).resolves.toHaveProperty("data[0].qty",)
      // await expect(data).resolves.toHaveProperty("data[0].name",)
    } )

    test( "Product Can find ID ", async () => {
        const data = productId(contextId)
      await expect(data).resolves.toMatchObject({ "msg": expect.any(String) })
      await expect(data).resolves.toMatchObject({ "code": 201 })
      await expect(data).resolves.toMatchObject({ "data": expect.any(Object) })
      await expect(data).resolves.toHaveProperty("data")
      await expect(data).resolves.toHaveProperty("code")
      await expect(data).resolves.toHaveProperty("msg",)
      await expect(data).resolves.toHaveProperty("data.price",)
      await expect(data).resolves.toHaveProperty("data.img",)
      await expect(data).resolves.toHaveProperty("data.type",)
      await expect(data).resolves.toHaveProperty("data.location",)
      await expect(data).resolves.toHaveProperty("data.desc",)
      await expect(data).resolves.toHaveProperty("data.id",)
      await expect(data).resolves.toHaveProperty("data.qty",)
      await expect(data).resolves.toHaveProperty("data.name",)
    } )

    test( "Product Cannot find wrong ID ", async () => {
        const data = productId('12312312')
      console.log(await data.then(d => d))
      await expect(data).resolves.toMatchObject({ "msg": expect.any(String) })
      await expect(data).resolves.toMatchObject({ "code": 400 })
      await expect(data).resolves.toMatchObject({ "error": expect.any(Array) })
      await expect(data).resolves.not.toMatchObject({ "data": expect.any(Array) })
      await expect(data).resolves.not.toHaveProperty("data")
      await expect(data).resolves.toHaveProperty("code")
      await expect(data).resolves.toHaveProperty("error")
      await expect(data).resolves.toHaveProperty("msg",)
      await expect(data).resolves.not.toHaveProperty("data.price",)
      await expect(data).resolves.not.toHaveProperty("data.img",)
      await expect(data).resolves.not.toHaveProperty("data.type",)
      await expect(data).resolves.not.toHaveProperty("data.location",)
      await expect(data).resolves.not.toHaveProperty("data.desc",)
      await expect(data).resolves.not.toHaveProperty("data.id",)
      await expect(data).resolves.not.toHaveProperty("data.qty",)
      await expect(data).resolves.not.toHaveProperty("data.name",)
    } )
  } )
  
  describe("PUT Product", () => {

    test( "Product Can edit by ID ", async () => {
      json.name = "update"
      json.id = contextId
      responseSuccess.data.name = json.name
        const data = productUpdate(json, `product/${ json.id }`)
      await expect(data).resolves.toHaveProperty("data.name", "update")
      await expect(data).resolves.toMatchObject(responseSuccess)
      
    } )

    test( "Product Cannot edit by wrong ID ", async () => {
      json.name = "update"
      json.id = contextId
      responseSuccess.data.name = json.name
        const data = productUpdate(json, `product/salah`,)
      console.log(await data.then(d => d))
      await expect(data).resolves.not.toHaveProperty("data.name", "update")
      await expect(data).resolves.toMatchObject(responseErrorID)
    })
    
    // test( "Product Cannot edit by empty ID ", async () => {
    //   json.name  = "update"
    //   json.id = contextId
    //   responseSuccess.data.name = json.name
    //   const data = useFetch("PUT", "product", json,)
    //   await expect( data ).resolves.not.toHaveProperty( "data.name", "update" )
    //   await expect( data ).resolves.toMatchObject( errorEmptyID( "PUT" ) )
    // } )

    test( "Product Cannot edit by partial value", async () => {
      json.name = "update"
      json.id = contextId
      const { name, qty, img, ...ress } = json
        const data = productUpdate(ress, `product/${ json.id }`)
      await expect(data).resolves.not.toHaveProperty("data.name", "update")
      await expect(data).resolves.toMatchObject(responseErrorPartial)
      
    } )

    test( "Product Cannot edit by empty value ", async () => {
      json.name = "update"
        const data = productUpdate({}, json.id)
      await expect(data).resolves.not.toHaveProperty("data.name", "update")
      await expect(data).resolves.toMatchObject(responseErrorAllUpdate)
      
    } )
  } )
  
  describe("DELETE Product", () => {
    test( "Product Can delete by ID ", async () => {
        const data = productDelete(contextId)
      await expect(data).resolves.toMatchObject({ "msg": expect.any(String) })
      await expect(data).resolves.toMatchObject({ "code": 200 })
      await expect(data).resolves.toMatchObject({ "data": expect.any(Object) })
    } )

    test( "Cannot Product by wrong ID ", async () => {
        const data = productDelete("asdaasdasda",)
        // await expect(data).resolves.not.toContain(statusTest("DELETE", "product"))
      await expect(data).resolves.toMatchObject({ "msg": expect.any(String) })
      await expect(data).resolves.toMatchObject({ "code": 400 })
      await expect(data).resolves.toMatchObject({ "error": expect.any(Array) })
      await expect(data).resolves.not.toMatchObject({ "data": expect.any(Array) })
      await expect(data).resolves.not.toHaveProperty("data")
      await expect(data).resolves.toHaveProperty("code")
      await expect(data).resolves.toHaveProperty("error")
      await expect(data).resolves.toHaveProperty("msg",)
      // await expect( data ).resolves.toMatchObject( errorEmptyID( "PUT" ) )
    } )

    test( "Product Cannot delete by empty ID", async () => {
        const data = productDelete(contextId)
      await expect(data).resolves.not.toHaveProperty("data.name", "update")
      await expect(data).resolves.toMatchObject({
        "code": 500,
        "error": {
          "clientVersion": "5.22.0",
          "code": "P2025",
          "meta": {
            "cause": "Record to delete does not exist.",
            "modelName": "Products",
          },
          "name": "PrismaClientKnownRequestError",
        },
        "msg": "Error on DELETE",
      })
    })
  })
} )
