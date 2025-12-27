const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
    // एक टोकन बनाओ जो 30 दिन तक चलेगा
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    // इसे कुकी (Cookie) के रूप में यूजर को भेजो (यह बहुत सुरक्षित तरीका है)
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // अगर लाइव है तो https चाहिए
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 दिन
    });
};

module.exports = generateToken;