import { PaginateValidationRequest } from './../../validations/paginate.validation';
import { getAllUsers } from '../../repositories/user.repository';

export async function userGetAllUseCase(paginate: PaginateValidationRequest) {
    return getAllUsers();
}