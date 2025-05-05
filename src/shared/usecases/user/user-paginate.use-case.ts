import { PaginateValidation } from '../../validations/paginate.validation';
import { paginateUser } from '../../repositories/user.repository';

export async function userPaginateUseCase(paginate: PaginateValidation) {
    return paginateUser(paginate);
}