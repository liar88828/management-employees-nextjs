export const toDate = (value?: number | string | Date) => {

    if (!value) {
        return "Date Invalid";
    }
    // @ts-ignore
    return new Date(Date.parse(value)).toLocaleString(
        "id-ID",
        {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        })
}

export const toDateIndo = (date: number | string | Date): string => {
    return new Date(date).toLocaleString(
        "id-ID",
        {
            dateStyle: "full",
        })
}

export const toDateIndoFull = (date: number | string | Date): string => {
    return new Date(date).toLocaleString(
        "id-ID",
        {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        })
}
