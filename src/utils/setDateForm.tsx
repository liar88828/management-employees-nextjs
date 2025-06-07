export function setDateForm(date: Date | undefined) {
    if (!date) {
        return new Date(new Date()).toISOString().split('T')[0]
    }

    return new Date(date).toISOString().split('T')[0]
}
