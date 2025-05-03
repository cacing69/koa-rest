import { generateToken } from '../../utils/jwt.util';

export type AuthUser = {
    id: string;
    email: string;
};

export const authRefreshUseCase = async (user: AuthUser): Promise<string> => {
    return generateToken(user);
};