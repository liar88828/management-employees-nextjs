import fs from 'fs';

export const fileSystem = async ( filePath: string ) => {
  console.log( checkFile( "public/" + filePath ) )
  if( checkFile( "public/" + filePath ) ) {
    return fs.unlink( "public/" + filePath, err => {
      if( err ) {
        console.error( "Delete error" )
        throw err;
      }
      console.info( "Delete Success" )
      return "Delete file Success "
    } )
  }
}

//check folder exist
export const checkFolder = ( folderName: string ) => {
  return fs.existsSync( folderName )
}

//  folder exist
export const makeFolder = ( folderName: string ) => {
  fs.mkdirSync( folderName );
}
//check file exist
export const checkFile  = ( filePath: string ) => {
  return fs.existsSync( filePath )
}
// create file
export const createFile = ( filePath: string, buffer: Buffer ) => {
  fs.writeFileSync( filePath, buffer );
}