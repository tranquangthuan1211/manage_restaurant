import dotenv from 'dotenv';
import express from 'express';
import useRouteUser from './route/user';
import swaggerJSDoc from 'swagger-jsdoc';
import SwaggerOption from "./configs/swagger";
import swaggerUi from 'swagger-ui-express';
import Database  from "./configs/db/index"
dotenv.config()
const app = express();
const PORT = process.env.PORT || 3001;
const swaggerDocument = swaggerJSDoc(SwaggerOption);
Database.connect()
const routesDef = [
  {path:"", route: useRouteUser()}
]
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routesDef.forEach(({path,route}) => {
  app.use(`/api/v1/${path}`,route)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
