import { describe, expect, it } from 'vitest';

import { toFetch } from "../../src/hook/toFetch";
import { TProductDB } from "../../src/interface/entity/product.model";
import { TDeliveryDB } from "../../src/interface/entity/delivery.model";
import { deliveryExample } from "../../src/assets/deliveryExample";
import { deliveryCreate } from "../../src/server/network/delivery";

const json: TDeliveryDB = structuredClone(deliveryExample)

let contextId = '4ba64c8b-a8ba-45ec-84ca-b9f669924427'

const responseSuccess = {
	"code": expect.any(Number),
	"data": {
		"id": expect.any(String),
		"price": expect.any(Number),
		"img": "kosong",
		"type": "kosong",
		"desc": "kosong",
		"address": "kosong",
		"name": "kosong",
		"created_at": expect.any(String),
		"updated_at": expect.any(String),
	},
	"msg": expect.any(String),
}

const responseErrorAll = {
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
				"phone",
			],
			"received": "undefined",
		},
		{
			"code": "invalid_type",
			"expected": "string",
			"message": "Required",
			"path": [
				"address",
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
				"desc",
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
	],
	"msg": "Error on POST",
}

const responseErrorAllUpdate = {
	'msg': expect.any(String),
	'code': 400,
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
				"phone",
			],
			"received": "undefined",
		},
		{
			"code": "invalid_type",
			"expected": "string",
			"message": "Required",
			"path": [
				"address",
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
				"desc",
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
				"phone",
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
		{
			"code": "invalid_type",
			"expected": "number",
			"message": "Required",
			"path": [
				"price",
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

describe.skip("Test Travel", () => {
	// --------
	describe("POST Travel", () => {
		it("Travel Can create a post success ", async () => {
			const data = deliveryCreate(json,)
			contextId = await data.then(d => d.data.id)
			await expect(data).resolves.toHaveProperty("data.name", "kosong")
			await expect(data).resolves.toMatchObject(responseSuccess)
		})
		
		it("Travel Cannot create partial value ", async () => {
            const { name, phone, desc, price, ...data } = json
            const response = toFetch<TProductDB>("POST", { url: "delivery", data })
            await expect(response).resolves.not.toHaveProperty("data.name", "kosong")
            await expect(response).resolves.toMatchObject(responseErrorPartial)
			
		})
		
		it("Travel Cannot create empty value ", async () => {
            const data = toFetch<TProductDB>("POST", {
                url: "delivery",
                data: {}
            })
			await expect(data).resolves.not.toHaveProperty("data.name", "kosong")
            // await expect(data).resolves.not.toContain(statusTest("POST", "delivery"))
			await expect(data).resolves.toMatchObject(responseErrorAll)
		})
	})
	
	describe("GET Method ", () => {
		it("Travel Can find by all ", async () => {
            const data = toFetch("GET", { url: `delivery` },)
			await expect(data).resolves.toMatchObject({ "msg": expect.any(String) })
			await expect(data).resolves.toMatchObject({ "code": 200 })
			await expect(data).resolves.toMatchObject({ "data": expect.any(Object) })
			await expect(data).resolves.toHaveProperty("data")
			await expect(data).resolves.toHaveProperty("code")
			await expect(data).resolves.toHaveProperty("msg",)
			// await expect(data).resolves.toHaveProperty("data[0].id",)
			// await expect(data).resolves.toHaveProperty("data[0].name",)
			// await expect(data).resolves.toHaveProperty("data[0].phone",)
			// await expect(data).resolves.toHaveProperty("data[0].address",)
			// await expect(data).resolves.toHaveProperty("data[0].type",)
			// await expect(data).resolves.toHaveProperty("data[0].price",)
			// await expect(data).resolves.toHaveProperty("data[0].img",)
			// await expect(data).resolves.toHaveProperty("data[0].desc",)
		})
		
		it("Travel Can find ID ", async () => {
            const data = toFetch("GET", {
                url: `delivery/${ contextId }`
            },)
			await expect(data).resolves.toMatchObject({ "msg": expect.any(String) })
			await expect(data).resolves.toMatchObject({ "code": 201 })
			await expect(data).resolves.toMatchObject({ "data": expect.any(Object) })
			await expect(data).resolves.toHaveProperty("data")
			await expect(data).resolves.toHaveProperty("code")
			await expect(data).resolves.toHaveProperty("msg",)
			await expect(data).resolves.toHaveProperty("data.id",)
			await expect(data).resolves.toHaveProperty("data.name",)
			await expect(data).resolves.toHaveProperty("data.phone",)
			await expect(data).resolves.toHaveProperty("data.address",)
			await expect(data).resolves.toHaveProperty("data.type",)
			await expect(data).resolves.toHaveProperty("data.price",)
			await expect(data).resolves.toHaveProperty("data.img",)
			await expect(data).resolves.toHaveProperty("data.desc",)
		})
		
		it("Travel Cannot find ID ", async () => {
            const data = toFetch("GET", {
                url: `delivery/${ 12312312 }`
            })
			await expect(data).resolves.toMatchObject({ "msg": expect.any(String) })
			await expect(data).resolves.toMatchObject({ "code": 400 })
			await expect(data).resolves.toMatchObject({ "error": expect.any(Array) })
			await expect(data).resolves.not.toMatchObject({ "data": expect.any(Array) })
			await expect(data).resolves.not.toHaveProperty("data")
			await expect(data).resolves.toHaveProperty("code")
			await expect(data).resolves.toHaveProperty("error")
			await expect(data).resolves.toHaveProperty("msg",)
		})
		
		// it( "Travel Cannot find empty ID ", async () => {
		//   const data = GateWay( "GET", "travel", "", )
		//   await expect( data ).resolves.not.toContain( statusTest( "GET" ) )
		//   await expect( data ).resolves.toMatchObject( errorEmptyID( "GET" ) )
		// } )
	})
	
	describe("PUT Travel", () => {
		it("Travel Can edit by ID ", async () => {
			json.name = "update"
			json.id = contextId
			responseSuccess.data.name = json.name
            const data = toFetch("PUT", {
                url: `delivery/${ json.id }`,
                data: json
            })
			await expect(data).resolves.toHaveProperty("data.name", "update")
			await expect(data).resolves.toMatchObject(responseSuccess)
		})
		
		it("Travel Cannot edit by wrong ID ", async () => {
			json.name = "update"
			json.id = contextId
			responseSuccess.data.name = json.name
            const data = toFetch("PUT", {
                url: `delivery/salah`,
                data: json
            })
			await expect(data).resolves.not.toHaveProperty("data.name", "update")
			await expect(data).resolves.toMatchObject(responseErrorID)
		})
		
		// it( "Travel Cannot edit by Partial value ", async () => {
		//   json.name                                      = "update"
		//   const { name, phone, desc, price, ...ress } = json
		//   const data                                     = GateWay( "PUT", "travel", json.id, ress, "text" )
		//   await expect( data ).resolves.not.toContain( statusTest( "PUT" ) )
		//   await expect( data ).resolves.toMatchObject( errorData( "PUT", [
		//     {
		//       code    : 'invalid_type',
		//       expected: 'string',
		//       received: 'undefined',
		//       path    : [ 'name' ],
		//       message : 'Nama is Required'
		//     },
		//     {
		//       code    : 'invalid_type',
		//       expected: 'string',
		//       received: 'undefined',
		//       path    : [ 'phone' ],
		//       message : 'Hp is Required'
		//     },
		//     {
		//       code    : 'invalid_type',
		//       expected: 'string',
		//       received: 'undefined',
		//       path    : [ 'desc' ],
		//       message : 'Keterangan is Required'
		//     },
		//     {
		//       code    : 'invalid_type',
		//       expected: 'number',
		//       received: 'undefined',
		//       path    : [ 'price' ],
		//       message : 'Harga is Required'
		//     }
		//   ] ) )
		// } )
		
		it("Travel Cannot edit by empty ID", async () => {
			json.name = "update"
			json.id = contextId
            const { name, phone, desc, price, ...data } = json
            const response = toFetch("PUT", {
                url: `delivery/${ json.id }`,
                data
            })
            await expect(response).resolves.not.toHaveProperty("response.name", "update")
            await expect(response).resolves.toMatchObject(responseErrorPartial)
			
		})
		
		it("Travel Cannot edit by empty value ", async () => {
			json.name = "update"
            const data = toFetch("PUT", {
                url: `delivery/${ json.id }`,
                data: {}
            })
			await expect(data).resolves.not.toHaveProperty("data.name", "update")
			await expect(data).resolves.toMatchObject(responseErrorAllUpdate)
			
		})
		
	})
	
	describe.sequential("DELETE Travel", () => {
		
		it("Travel Can delete by ID ", async () => {
            const data = toFetch("DELETE", {
                url: `delivery/${ contextId }`
            })
			await expect(data).resolves.toMatchObject({ "msg": expect.any(String) })
			await expect(data).resolves.toMatchObject({ "code": 200 })
			await expect(data).resolves.toMatchObject({ "data": expect.any(Object) })
		})
		
		it("Travel Cannot delete by wrong ID ", async () => {
            const data = toFetch("DELETE", {
                url: `delivery/${ 123123 }`
            })
			await expect(data).resolves.toMatchObject({ "msg": expect.any(String) })
			await expect(data).resolves.toMatchObject({ "code": 400 })
			await expect(data).resolves.toMatchObject({ "error": expect.any(Array) })
			await expect(data).resolves.not.toMatchObject({ "data": expect.any(Array) })
			await expect(data).resolves.not.toHaveProperty("data")
			await expect(data).resolves.toHaveProperty("code")
			await expect(data).resolves.toHaveProperty("error")
			await expect(data).resolves.toHaveProperty("msg",)
		})
		
		it("Travel Cannot delete by empty ID ", async () => {
            const data = toFetch("DELETE", {
                url: `delivery/${ contextId }`,
            })
			await expect(data).resolves.not.toHaveProperty("data.name", "update")
			await expect(data).resolves.toMatchObject({
				"code": 500,
				"error": {
					"clientVersion": "5.22.0",
					"code": "P2025",
					"meta": {
						"cause": "Record to delete does not exist.",
						"modelName": "Deliverys",
					},
					"name": "PrismaClientKnownRequestError",
				},
				"msg": "Error on DELETE",
			})
		})
	})
})
