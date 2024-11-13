const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentation for Node.js API',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Your server's base URL
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
module.exports = { swaggerUi, swaggerDocs };