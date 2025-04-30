import * as userRepository from '../repositories/userRepository';

export async function registerUser(userData: { name: string; email: string }) {
    const existing = await userRepository.getUserByEmail(userData.email);
    if (existing) {
        throw new Error('Email already exists');
    }
    return userRepository.createUser(userData);
}