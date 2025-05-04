import { findUserByEmail, verifyPassword } from '../../repositories/user.repository';
import { generateToken } from '../../utils/jwt.util';
import { AuthTokenValidation } from '../../validations/auth-token.validation';

export type AuthLoginResponse = {
    user: any,
    token: string;
};

export const authTokenUseCase = async (
    input: AuthTokenValidation
): Promise<AuthLoginResponse> => {
    // Step 1: Cari user berdasarkan email
    const user = await findUserByEmail(input.email);

    if (!user) {
        throw new Error('Email or password is invalid');
    }

    // Step 2: Verifikasi password
    const isValidPassword = await verifyPassword(input.password, user.password);

    if (!isValidPassword) {
        throw new Error('Email or password is invalid');
    }

    const payload = {
        id: user.id,
        email: user.email
    };

    const token = generateToken(payload);

    // Step 3: Return user tanpa password
    return {
        user: {
            id: user.id,
            firstName: user.firstName,
            email: user.email,
        },
        token
    };
};