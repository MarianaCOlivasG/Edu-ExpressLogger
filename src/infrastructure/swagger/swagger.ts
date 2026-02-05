import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import type { Express } from "express"

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation"
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Local server"
      }
    ]
  },
  apis: [
    './src/**/*.ts',
    "src/infrastructure/swagger/schemas.ts",
  ]
}

const swaggerSpec = swaggerJsdoc(options)

export const setupSwagger = (app: Express) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}