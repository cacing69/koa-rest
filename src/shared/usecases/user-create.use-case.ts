import { createUser, findUserByEmail } from '../repositories/user.repository';
import { CreateUserRequest } from '../validations/user-create.validation';

export async function userCreateUseCase(user: CreateUserRequest) {
    const existing = await findUserByEmail(user.email);

    if (existing) {
        throw new Error('Email already exists');
    }

    return createUser(user);
}