
import { readdirSync, readFileSync } from 'fs';
import YAML from 'yamljs';
import { koaSwagger } from 'koa2-swagger-ui';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import { openapiComponents } from '../utils/openapi.util';
import fs from 'fs';
// Removed unused import

const docsPath = readFileSync(
    path.resolve(__dirname, '../../docs/swagger.yaml'),
    'utf8'
);

const swaggerYamlPath = path.resolve(__dirname, '../../docs/swagger.yaml');
const swaggerYAML = YAML.parse(fs.readFileSync(swaggerYamlPath, 'utf8'));

// Gabungkan semua spec
const mergedSpec = {
    ...swaggerYAML,
    ...openapiComponents
};


// Options swagger-jsdoc
const options = {
    swaggerDefinition: mergedSpec,
    apis: ['./src/**/*.router.ts'] // route dengan @openapi comment
};

const swaggerSpec = swaggerJSDoc(options);

export default koaSwagger({
    routePrefix: '/docs',
    swaggerOptions: {
        spec: swaggerSpec as Record<string, unknown>,
        customCss: '.swagger-ui .topbar { display: none }'
    }
});