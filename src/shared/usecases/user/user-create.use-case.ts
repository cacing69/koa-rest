import { createUser, findUserByEmail } from '../../repositories/user.repository';
import { UserCreateValidation } from '../../validations/user-create.validation';

export async function userCreateUseCase(user: UserCreateValidation) {
    const existing = await findUserByEmail(user.email);

    if (existing) {
        throw new Error('Email already exists');
    }

    return createUser(user);
}