import jwt from 'jsonwebtoken';

const generateTokenSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '5h'
    });

    res.cookie("jwt", token, {
        maxAge: 5 * 60 * 60 * 1000,
        // httpOnly: true,
        // sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    });
}

export default generateTokenSetCookie;
