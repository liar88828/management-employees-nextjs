export function consoleLog(from: string, message?: string|null) {
    console.log({from, message})
}

export  function consoleError(from: string, message: string) {
    console.log({from, message})
}