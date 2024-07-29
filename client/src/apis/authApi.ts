import axios from "axios"

interface SignupParams{
    name: string;
    email: string;
    password: string;
}

export const Signup = async ({name, email, password}: SignupParams): Promise<any> => {
    try {
        const res = await axios.post('https://crework-assignment.onrender.com/api/v1/users/register', {
            name,
            email, 
            password
        })
        return res.data;
    } catch (error: any) {
        throw new Error(error)
    }
}

interface LoginParams {
    email: string;
    password: string;
}

export const Login = async ({ email, password }: LoginParams): Promise<any> => {
    try {
        const res = await axios.post('https://crework-assignment.onrender.com/api/v1/users/login', {
            email,
            password
        })
        return res.data;
    } catch (error: any) {
        throw new Error(error)
    }
}