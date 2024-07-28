import { User } from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    maxAge: 30 * 24 * 60 * 60 * 1000
};

export const getUserDetails = async (req, res) => {
    console.log("req.user", req.user)
    if (req.user) {
        res.status(201).json({
           data: req.user
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
}

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) { 
        res.status(400).json({ message: 'Please enter name, email and password' });
    }

    const userExists = await User.findOne({ email })
    
    if (userExists) {
        res.status(409).json({
            message: 'User already exists'
        });
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        const token = generateToken(user._id)
        // res.cookie('token', token, COOKIE_OPTIONS)
        res.status(201).json({
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            },
            message: "User registered successfully"
        })
    } else {
        res.status(400).json({
            message: 'Invalid user data'
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) { 
        res.status(400).json({ message: 'Please enter email and password' });
    }

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404).json({ message: 'User not found' });
    }

    if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id)

        res.cookie('token', token, COOKIE_OPTIONS)
        res.json({
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            message: "User logged in successfully"
        })
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
}

export const logout = async (_, res) => {
    res.cookie('token', '',
        {
            httpOnly: true,
            secure: true,
            expires: new Date(0),
        }
    );
    res.status(200).json({ message: 'Logged out successfully' });
};