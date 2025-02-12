export const currentDate = new Date();
export const currentYear = currentDate.getFullYear();
export const currentMonth = currentDate.getMonth() + 1; // Adding 1 to adjust for 0-based months

const formattingOptions = {
	hari: {weekday: "long"},
	angka: {dateStyle: "long"},
	tanggal: {dateStyle: "medium"},
	full: {dateStyle: "full"},
	month: {month: 'long'}
};

type MyTypeObject = keyof typeof formattingOptions;

export const today = currentDate.getDate()

export function addDays(days: number) {
	return new Date(currentDate.getTime() + days * 24 * 60 * 60 * 1000);
}

export const getTime = (detik: boolean = false) => {
	let today = currentDate
	let d = ":" + today.getSeconds()

	return today.getHours() + ":" + today.getMinutes() + detik && d;
}


export const getDates = (option: MyTypeObject, value: number) => {

	const d = new Date(`${currentYear}-${currentMonth + value}-01`)

	// @ts-ignore
	return d.toLocaleString('id-ID', formattingOptions[option]);
}

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

export const toDateIndo = (date: number | string | Date):  string => {

    return new Date(date).toLocaleString(
		"id-ID",
		{
            dateStyle: "full",
		})

}

export const defaultDate = () => {
	let curr = currentDate
	curr.setDate(curr.getDate() + 3);
	return curr.toISOString().substring(0, 10);
}

export const getKirim = (waktuKirim: string | Date) => {
	return new Date(waktuKirim)
}

export const formDate = (value: string|Date ):Date => {
    // @ts-ignore
    return new Date(value).toISOString().split('T')[0]
}

export function toDateDayName(data: Date) {
    return data.toLocaleDateString('en-US', { weekday: 'long' });
}

export function toDateClock(data: Date) {
    return data.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

export const getDateCalender = (data: Date) => {
    return data.toISOString().split('T')[0];
}