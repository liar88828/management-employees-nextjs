export function toAccounting(accounting?: string): string {

    if (!accounting) {
        return 'please input number'
    }
    // Convert the number to a string and split it into groups of 4 characters
    return accounting.replace(/(\d{4})(?=\d)/g, "$1 ");
}
