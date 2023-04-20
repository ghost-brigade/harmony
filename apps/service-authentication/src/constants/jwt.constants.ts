export const jwtConstants = {
    secret: process.env?.JWT_TOKEN_SECRET || 'secret',
    expiresIn: '1d',
};
