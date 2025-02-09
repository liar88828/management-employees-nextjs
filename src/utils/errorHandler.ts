import { TResponse } from '@/interface/server/TResponse';
import { ErrorStatusCode, ErrorStatusName, findErrorName, findStatusCode } from "@/assets/error-status";

export class ErrorNew extends Error {
  constructor( m: TResponse<string> | string = "from new Error  " ) {
    super( "error Bos ku" );
    this.message = JSON.stringify( m )
  }
}

export class ErrorStore extends Error {
	constructor(public message: string) {
		super("error Bos ku");
        this.message = message;
    }
}

// export class ErrorResponse extends Error {
//     constructor(
//         public message: string,
//         public code: ErrorStatusCode,
//         public error: ErrorStatusName
//     ) {
//         super(message);
//         this.message = message;
//         this.code = code;
//         this.error = error;
//     }
// }

export class ErrorResponseCode extends Error {
    public name: ErrorStatusName

    constructor(
        public message: string,
        public code: ErrorStatusCode,
    ) {
        super(message);
        this.message = message;
        this.code = code;
        this.name = findErrorName(code);
    }
}

export class ErrorResponseName extends Error {
    public code: ErrorStatusCode

    constructor(
        public message: string,
        public name: ErrorStatusName
    ) {
        super(message);
        this.message = message;
        this.code = findStatusCode(name);
        this.name = name;
    }
}

