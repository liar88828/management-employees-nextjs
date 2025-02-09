// noinspection JSUnusedLocalSymbols

export const toRupiah = (n: number | string | undefined): string => {
  if( typeof n !== "string" ) {

    if( n ) {
      return new Intl.NumberFormat( "id-ID", {
        style   : "currency",
        currency: "IDR"
      } ).format( n ).replace( ",00", "" );
    }
  }
  return "kosong";
}
