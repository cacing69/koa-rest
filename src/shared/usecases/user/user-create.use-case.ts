import { createUser, findUserByEmail } from '../../repositories/user.repository';
import { UserCreateValidationRequest } from '../../validations/user-create.validation';

export async function userCreateUseCase(user: UserCreateValidationRequest) {
    const existing = await findUserByEmail(user.email);

    if (existing) {
        throw new Error('Email already exists');
    }

    return createUser(user);
}