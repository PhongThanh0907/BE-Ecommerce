import JWT, { JwtPayload } from 'jsonwebtoken';

import { TOKEN_SECRET } from '../utils/config';
import HttpException from '../utils/httpException';

interface UserPayload extends JwtPayload {
    _id: string;
    userName: string;
    email: string;
    isAdmin: boolean;
}

export function generateToken(user: UserPayload): string {
    return JWT.sign(user, TOKEN_SECRET, {
        expiresIn: '1d',
    });
}

export function verifyToken(token: string): UserPayload {
    try {
        return JWT.verify(token, TOKEN_SECRET) as UserPayload;
    } catch (error) {
        throw new HttpException('Invalid token', 401);
    }
}