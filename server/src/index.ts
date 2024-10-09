import "dotenv/config";
import express from 'express';
import Database from './configs/db';
import useRouteUser from './routes/users';
import useRouteMenu from './routes/menu';
import swaggerJSDoc from 'swagger-jsdoc';
import SwaggerOption from "./configs/swagger";
import swaggerUi from 'swagger-ui-express';
import morgan from "morgan";
import cors from 'cors';
const app = express();
const port = process.env.PORT || 3000;
const apiRoute = express.Router();
const swaggerDocument = swaggerJSDoc(SwaggerOption);
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
Database.connect();
const routesDef = [
  {path:"users", route: useRouteUser()},
  {path:"menus", route: useRouteMenu()}
]
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routesDef.forEach(({path,route}) => {
  app.use(`/api/v1/${path}`,route)
})
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});