import { expect, test } from "vitest";

test('', () => {
    expect(1 + 1).toEqual(2)
})
// import { describe, expect, it } from 'vitest';
//
// import { statusTest } from '../../src/app/utils/test/statusTest';
// import { successResponse } from '../../src/lib/utils/successResponse';
// import { errorData, errorEmptyData, errorEmptyID } from '../../src/lib/utils/errorResponse';
// import { sendData } from '../../src/app/utils/ress/SendApi';
//
// const default2: TPOrderan =
//         {
//           alamatPenerima: "kosong",
//           guna          : "kosong",
//           hpPenerima    : "kosong",
//           hpPengirim    : "02398978978",
//           id            : "parent_kosong_kosong_kosong_kosong_kosong",
//           kirim         : "1999-07-01",
//           lokasi        : "kosong",
//           namaPengiriman: "kosong",
//           ongkir        : 23,
//           penerima      : "kosong",
//           pengirim      : "kosong",
//           pesan         : "2000-07-01",
//           semuaProduct  : [
//             // {
//             //   harga     : 42000,
//             //   id        : "321",
//             //   jumlah    : 10,
//             //   jenis     : "Item",
//             //   keterangan: "Enak",
//             //   lokasi    : "ungaran",
//             //   img       : "kosong",
//             //   nama      : "Tahu sBakso Rebus",
//             //   orderanId : "Lam5b_327_Ot_240229_1312_Sem_kosong"
//             // },
//             {
//               nama      : "kosong",
//               lokasi    : "kosong",
//               jenis     : "kosong",
//               harga     : 9999,
//               jumlah    : 9999,
//               keterangan: "kosong",
//               orderanId : "parent_kosong_kosong_kosong_kosong_kosong",
//               img       : "kosong"
//             }
//           ],
//           status        : "kosong",
//           totalBayar    : 9999,
//           totalPenjualan: 9999,
//           typePembayaran: "kosong",
//           waktuKirim    : "03:00:00"
//         }
//
// const json = structuredClone( default2 )
//
// describe( "Test Orderan", () => {
//   // --------
//   describe( "POST Orderan", () => {
//     it( "Orderan Can create a post success ", async () => {
//       const data = GateWay( "POST", "orderan", "", json, )
//       await expect( data ).resolves.toContain( statusTest( "POST" ) )
//       await expect( data ).resolves.toHaveProperty( "data[0].penerima", "kosong" )
//       await expect( data ).resolves.toHaveProperty( "data[0].alamatPenerima", "kosong" )
//       await expect( data ).resolves.toHaveProperty( "data[0].guna", "kosong" )
//       await expect( data ).resolves.toHaveProperty( "data[0].hpPenerima", "kosong" )
//
//     } )
//
//     it( "Orderan cannot create partial value ", async () => {
//       const { penerima, semuaProduct, ...ress } = json
//       const data                                = GateWay( "POST", "orderan", "", ress, "" )
//       await expect( data ).resolves.not.toHaveProperty( "data.nama", "kosong" )
//       await expect( data ).resolves.not.toContain( statusTest( "POST" ) )
//       await expect( data ).resolves.toMatchObject(
//         errorData( "POST", [
//           {
//             code    : 'invalid_type',
//             expected: 'string',
//             received: 'undefined',
//             path    : [ 'penerima' ],
//             message : 'penerima is required'
//           },
//           {
//             code    : 'invalid_type',
//             expected: 'array',
//             received: 'undefined',
//             path    : [ 'semuaProduct' ],
//             message : 'Required'
//           }
//         ] ) )
//     } )
//
//     it( "Orderan cannot create empty value ", async () => {
//       const data = GateWay( "POST", "orderan", "", {}, "" )
//       await expect( data ).resolves.not.toHaveProperty( "data.nama", "kosong" )
//       await expect( data ).resolves.not.toContain( statusTest( "POST" ) )
//       await expect( data ).resolves.toMatchObject( errorEmptyData( "POST" ) )
//     } )
//   } )
//
//   describe( "GET Orderan", () => {
//     it( "Orderan Can find by all ", async () => {
//       // const data = getDashboard()
//       const data = GateWay( "GET", "orderan", "all", )
//       await expect( data ).resolves.toContain( statusTest( "GET" ) )
//       await expect( data ).resolves.toHaveProperty( "data[0].alamatPenerima", )
//       await expect( data ).resolves.toHaveProperty( "data[0].guna", )
//       await expect( data ).resolves.toHaveProperty( "data[0].hpPenerima", )
//       await expect( data ).resolves.toHaveProperty( "data[0].hpPengirim", )
//       await expect( data ).resolves.toHaveProperty( "data[0].id", )
//       await expect( data ).resolves.toHaveProperty( "data[0].kirim", )
//       await expect( data ).resolves.toHaveProperty( "data[0].lokasi", )
//       await expect( data ).resolves.toHaveProperty( "data[0].namaPengiriman", )
//     } )
//
//     it( "Orderan Can find ID ", async () => {
//       const data = GateWay( "GET", "orderan", json.id, )
//       await expect( data ).resolves.toContain( statusTest( "GET" ) )
//       // await expect( data ).resolves.toMatchObject( successResponse( json, "GET" ) )
//     } )
//
//     it( "Orderan Can find table ID semua ", async () => {
//       const data = GateWay( "GET", "orderan", "semua", "", "table" )
//       // await expect( data ).resolves.toContain( statusTest( "GET" ) )
//       await expect( data ).resolves.toMatchObject( statusTest( "GET" ) )
//     } )
//
//     it( "Orderan Can find table ID di dikirim", async () => {
//       const data = GateWay( "GET", "orderan", "di dikirim", "", "table" )
//       await expect( data ).resolves.toContain( statusTest( "GET" ) )
//     } )
//
//     it( "Orderan Cannot find wrong ID ", async () => {
//       const data = GateWay( "GET", "orderan", "salah", )
//       await expect( data ).resolves.not.toContain( statusTest( "GET" ) )
//     } )
//
//     it( "Orderan Cannot find empty ID ", async () => {
//       const data = GateWay( "GET", "orderan", "", )
//       await expect( data ).resolves.not.toContain( statusTest( "GET" ) )
//       await expect( data ).resolves.toMatchObject( errorEmptyID( "GET" ) )
//     } )
//   } )
//
//   describe( "PUT Orderan", () => {
//     it( "Orderan Can edit by ID ", async () => {
//       json.namaPengiriman = "update"
//       const data          = GateWay( "PUT", "orderan", json.id, json, "" )
//       await expect( data ).resolves.toHaveProperty( "data.0.count", 1 )
//       await expect( data ).resolves.toHaveProperty( [ "data", 1, "count" ], 1 )
//       await expect( data ).resolves.toHaveProperty( [ "data", 2, "namaPengiriman" ], "update" )
//     } )
//
//     it( "Orderan Cannot edit by wrong ID ", async () => {
//       json.namaPengiriman = "update"
//       const data          = GateWay( "PUT", "orderan", "salah", json, "" )
//       await expect( data ).resolves.not.toHaveProperty( "data.namaPengiriman", "update" )
//     } )
//
//     it( "Orderan Cannot edit by empty ID ", async () => {
//       json.namaPengiriman = "update"
//       const data          = GateWay( "PUT", "orderan", "", json, "" )
//       await expect( data ).resolves.not.toHaveProperty( "data.namaPengiriman", "update" )
//       await expect( data ).resolves.toMatchObject( errorEmptyID( "PUT" ) )
//     } )
//
//     it( "Orderan Cannot edit by partial value", async () => {
//       json.namaPengiriman               = "update"
//       const { namaPengiriman, ...ress } = json
//       const data                        = GateWay( "PUT", "orderan", json.id, ress, "" )
//       await expect( data ).resolves.not.toHaveProperty( "data.namaPengiriman", "update" )
//       await expect( data ).resolves.toMatchObject( errorData( "PUT", [
//         {
//           "code"    : "invalid_type",
//           "expected": "string",
//           "message" : "namaPengiriman is required",
//           "path"    : [
//             "namaPengiriman",
//           ],
//           "received": "undefined",
//         }, ] ) )
//     } )
//     it( "Orderan Cannot edit by empty value ", async () => {
//       json.namaPengiriman = "update"
//       const data          = GateWay( "PUT", "orderan", json.id, {}, "" )
//       await expect( data ).resolves.not.toHaveProperty( "data.namaPengiriman", "update" )
//       await expect( data ).resolves.toMatchObject( errorEmptyData( "PUT" ) )
//     } )
//   } )
//
//   describe( "DELETE Orderan", () => {
//     it.skip( "Orderan Can delete by id ", async () => {
//       const data = GateWay( "DELETE", "orderan", default2.id, )
//       await expect( data ).resolves.toContain( statusTest( "DELETE" ) )
//       await expect( data ).resolves.toMatchObject( successResponse( json, "DELETE" ) )
//     } )
//
//     it( "Orderan Can delete by many ID ", async () => {
//       const data = sendData( "orderan", "DELETE", "", "", [ default2.id ], )
//       await expect( data ).resolves.toMatchObject( successResponse( [
//         { "count": 1, },
//         { "semuaProduct": [], },
//       ], "DELETE" ) )
//     } )
//
//     it( "Orderan Cannot delete by wrong ID ", async () => {
//       const data = GateWay( "DELETE", "orderan", "salah", {} )
//       await expect( data ).resolves.not.toContain( statusTest( "DELETE" ) )
//     } )
//
//     it( "Orderan Cannot delete by empty ID ", async () => {
//       const data = GateWay( "DELETE", "orderan", "", {}, )
//       await expect( data ).resolves.not.toContain( statusTest( "DELETE" ) )
//       await expect( data ).resolves.toMatchObject( errorEmptyID( "DELETE" ) )
//     } )
//
//   } )
// } )
