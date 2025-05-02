import convertToOpenApiSchema from "zod-to-json-schema";
import { authTokenValidation } from "../validations/auth-token.validation";
import { authTokenResponseZod } from "../../features/auth/responses/auth-token.response";
import { errorResponseZod } from "../responses/error-response.response";
import { successResponseZod } from "../responses/success-response.response";
import { testPublicResponseZod } from "../../features/test/responses/test-public.response";
import { userCreateValidation } from '../validations/user-create.validation';

export const openapiComponents = {
    components: {
        schemas: {
        },
        responses: {
            // Response
            AuthTokenResponse: convertToOpenApiSchema(authTokenResponseZod),
            ErrorResponse: convertToOpenApiSchema(errorResponseZod),
            SuccessResponse: convertToOpenApiSchema(successResponseZod),
            TestPublicResponse: convertToOpenApiSchema(testPublicResponseZod),

        },
        requestBodies: {
            // Validation
            AuthTokenValidation: convertToOpenApiSchema(authTokenValidation),
            UserCreateValidation: convertToOpenApiSchema(userCreateValidation),
        }
    },
};
