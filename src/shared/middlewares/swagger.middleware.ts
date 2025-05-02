import path from 'path';
import fs from 'fs';
import YAML from 'yamljs';
import { koaSwagger } from 'koa2-swagger-ui';
import swaggerJSDoc from 'swagger-jsdoc';
import { openapiComponents } from '../utils/openapi.util';

// Path ke file swagger.yaml
const swaggerYamlPath = path.resolve(__dirname, '../../docs/swagger.yaml');

// Parse file YAML hanya sekali
const swaggerYAML = YAML.parse(fs.readFileSync(swaggerYamlPath, 'utf8'));

// Gabungkan komponen dari file YAML dan utilitas (misal tambahan securitySchemes)
const mergedComponents = {
    ...swaggerYAML.components,
    ...openapiComponents.components,
};

// Gabungkan keseluruhan spesifikasi
const mergedSpec = {
    ...swaggerYAML,
    components: mergedComponents,
};

// Konfigurasi swagger-jsdoc
const options = {
    swaggerDefinition: mergedSpec,
    apis: ['./src/**/*.router.ts'], // include komentar openapi di router
};

// Hasil akhir spesifikasi Swagger
const swaggerSpec = swaggerJSDoc(options);

// Middleware Koa Swagger
export default koaSwagger({
    routePrefix: '/docs',
    swaggerOptions: {
        spec: swaggerSpec as Record<string, unknown>,
        customCss: '.swagger-ui .topbar { display: none }',
    },
});
