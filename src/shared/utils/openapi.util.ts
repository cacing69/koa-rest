import convertToOpenApiSchema from 'zod-to-json-schema';
import { authTokenValidation } from '../validations/auth-token.validation';
import { authTokenResponseZod } from '../../features/responses/auth-token.response';
import { errorResponseZod } from '../responses/error-response.response';
import { successResponseZod } from '../responses/success-response.response';

export const openapiComponents = {
    components: {
        schemas: {
            ErrorResponse: convertToOpenApiSchema(errorResponseZod),
            SuccessResponse: convertToOpenApiSchema(successResponseZod),
            AuthTokenValidation: convertToOpenApiSchema(authTokenValidation),
            AuthTokenResponse: convertToOpenApiSchema(authTokenResponseZod),
        }
    }
};