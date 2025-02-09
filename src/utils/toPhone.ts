export function toPhone(phoneNumber: string | number | undefined): string {

    if (phoneNumber !== undefined) {
        function toString(phone: string | number) {
            if (typeof phone === 'number') {
                return phone.toString()
            }
            return phone
        }

        phoneNumber = toString(phoneNumber)
        phoneNumber = phoneNumber.startsWith("0") ? phoneNumber : "0" + phoneNumber
        // Remove any non-numeric characters from the phone number
        const numericPhoneNumber = phoneNumber.replace(/\D/g, '');

        // Check if the numeric phone number starts with '0'
        // if (numericPhoneNumber.startsWith('0')) {
        //   const formattedNumber = `+62${numericPhoneNumber.slice(1)}`;
        //   return formattedNumber;
        // }

        if (numericPhoneNumber.startsWith('0')) {
            return `+62 ${ numericPhoneNumber.slice(1, 5) } ${ numericPhoneNumber.slice(5, 9) } ${ numericPhoneNumber.slice(9) }`;
        }

        // If the phone number doesn't start with '0', assume it's already properly formatted
        // return phoneNumber;
    }
    return "-kosong-"

}
