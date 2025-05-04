import { PaginateValidation } from '../../validations/paginate.validation';
import { getAllUsers } from '../../repositories/user.repository';

export async function userPaginateUseCase(pagination: PaginateValidation) {
    return getAllUsers();
}