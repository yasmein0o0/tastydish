import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // Limit each IP to 500 requests per window
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false, // Disable deprecated headers
    message: {
        error: 'TOO_MANY_REQUESTS',
        message: 'Too many requests from this IP, please try again later'
    }
});

export const logInRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    skip: (req) => req.method !== 'POST'
});

export const refreshLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Limit each IP to 10 refresh attempts per hour
    message: {
        error: 'TOO_MANY_REFRESHES',
        message: 'Too many token refresh attempts'
    }
});