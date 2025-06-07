// METHOD  URL                      STATUS  RESPONSE
// GET     /users                   200     [John, Peter]
// GET     /users/john              200     John
// GET     /unknown-url-eager       404     Not Found
// GET     /users/kyle              404     User Not found
// GET     /users?userName=kyle`        200     []
// DELETE  /users/john              204     No Content

export class ErrorResponse extends Error {
    constructor(public msg: string, public code: number) {
        super(msg);
        Object.setPrototypeOf(this, ErrorResponse.prototype);
    }
}

export class ErrorDatabase extends Error {
    constructor(
        public msg: string,
        // public code: number
    ) {
        super(msg);
        Object.setPrototypeOf(this, ErrorDatabase.prototype);
    }
}
