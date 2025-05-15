export function setDateForm(date: Date | undefined) {
    if (!date) {
        return undefined;
    }
    const myDate = new Date(date).toISOString().split('T')[0];
    // console.log(myDate);//2001-05-08

    return myDate
}
