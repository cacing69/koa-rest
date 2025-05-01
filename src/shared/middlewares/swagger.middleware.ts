
import { readdirSync, readFileSync } from 'fs';
import YAML from 'yamljs';
import { koaSwagger } from 'koa2-swagger-ui';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import { openapiComponents } from '../utils/openapi.util';
import fs from 'fs';
// import { openapiSchemas } from '../utils/openapi.util';
// Removed unused import

const docsPath = readFileSync(
    path.resolve(__dirname, '../../docs/swagger.yaml'),
    'utf8'
);

// const swaggerDefinition = {
//     openapi: '3.0.0',
//     info: {
//         title: 'KOA Rest Documentation',
//         version: '1.0.0',
//         description: 'RESTful API documentation'
//     },
//     servers: [
//         {
//             url: 'http://localhost:3000/api'
//         }
//     ],
// };

const swaggerYamlPath = path.resolve(__dirname, '../../docs/swagger.yaml');
const swaggerYAML = YAML.parse(fs.readFileSync(swaggerYamlPath, 'utf8'));

// Gabungkan semua spec
const mergedSpec = {
    ...swaggerYAML,
    ...openapiComponents
};

console.log(mergedSpec)

// const options = {
//     mergedSpec,
//     // Cari semua route/controller yang dikomen dengan @openapi
//     apis: ['./src/**/*.router.ts'],
// };

// Options swagger-jsdoc
const options = {
    swaggerDefinition: mergedSpec,
    apis: ['./src/**/*.router.ts'] // route dengan @openapi comment
};

const swaggerSpec = swaggerJSDoc(options);

// // Tambahkan schema otomatis dari Zod
// for (const [key, value] of Object.entries(openapiSchemas)) {
//     // @ts-ignore
//     swaggerSpec[key] = value;
// }

export default koaSwagger({
    routePrefix: '/docs',
    swaggerOptions: {
        spec: swaggerSpec as Record<string, unknown>,
        customCss: '.swagger-ui .topbar { display: none }'
    }
});