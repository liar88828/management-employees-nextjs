type OtpOptions = {
    length: number; // Length of the OTP
    includeDigits?: boolean; // Include numeric characters
    includeAlphabets?: boolean; // Include alphabetic characters
};

export function toOtp(options: OtpOptions): string {
    const { length, includeDigits = true, includeAlphabets = false } = options;

    if (!includeDigits && !includeAlphabets) {
        throw new Error("At least one of `includeDigits` or `includeAlphabets` must be true.");
    }

    const digits = "0123456789";
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let characterPool = "";

    if (includeDigits) {
        characterPool += digits;
    }
    if (includeAlphabets) {
        characterPool += alphabets;
    }

    let otp = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterPool.length);
        otp += characterPool[randomIndex];
    }

    return otp;
}

// Usage Examples:
// const otp1 = generateOtp({ length: 6 }); // Default: Digits only
// const otp2 = generateOtp({ length: 8, includeDigits: true, includeAlphabets: true }); // Digits and alphabets
// const otp3 = generateOtp({ length: 4, includeAlphabets: true, includeDigits: false }); // Alphabets only
// console.log("OTP 1:", otp1); // OTP 1: 472836 (6 digits, digits only)
// console.log("OTP 2:", otp2); // OTP 2: A3B7D9F8 (8 characters, digits and alphabets)
// console.log("OTP 3:", otp3); // OTP 3: QWER (4 characters, alphabets only)
//
