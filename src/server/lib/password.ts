import bcrypt from "bcrypt";

export const checkPassword = async (passwordUser: string, passwordDb: string) => {

    const response = await bcrypt.compare(passwordUser, passwordDb)
    if (!response) {
        throw new Error('Password is incorrect')
    }
    return response
}
