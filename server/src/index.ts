import "dotenv/config";
import { Request, Response } from 'express';
import express, { NextFunction } from 'express';
import Database from './configs/db';
import useRouteUser from './routes/users';
import useRouteMenu from './routes/menu';
import useRouteCategory from './routes/category';
import useRouteOrder from './routes/order';
import useRouteAppointment from './routes/appointment';
import useRouteAssess from "./routes/assess"
import useRouteStaff from "./routes/staff"
import usePaymentRoute from "./routes/payment"
import useRouteComplaint from "./routes/complaint"
import useRouteLeave from "./routes/leave"
import useRouteReservations from "./routes/reservation";
import swaggerJSDoc from 'swagger-jsdoc';
import SwaggerOption from "./configs/swagger";
import swaggerUi from 'swagger-ui-express';
import morgan from "morgan";
import cors from 'cors';
import rabbitMQ from "./configs/rabbit-mq";
import { rateLimit } from 'express-rate-limit'

import useRouteReviews from './routes/reviews';
import path from "path";

const app = express();
const port = process.env.PORT || 3001;
const swaggerDocument = swaggerJSDoc(SwaggerOption);
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
Database.connect();
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  limit: 1000,
  message: "Too many requests from this IP, please try again after an hour",
})
app.use("/api/", limiter);
// app.all("/api/*",(req:Request,res:Response,next:NextFunction) => {
//   res.status(404).json({
//     error: "Not Found",
//     message: "The requested URL was not found on this server"
//   })
// })
const routesDef = [
  {path:"users", route: useRouteUser()},
  {path:"menus", route: useRouteMenu()},
  {path: "categories", route: useRouteCategory()},
  {path: "orders", route: useRouteOrder()},
  {path:"appointments", route: useRouteAppointment()},
  {path:"assess", route: useRouteAssess()},
  {path : "staffs", route: useRouteStaff()},
  {path:"payments",route: usePaymentRoute()},
  {path:"complaints", route: useRouteComplaint()},
  {path:"leaves", route: useRouteLeave()},
  {path:"reservations", route: useRouteReservations()}
]
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routesDef.forEach(({ path, route }) => {
  app.use(`/api/v1/${path}`, route)
})
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not found") as any;
  error.status = 404;
  next(error);
});
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  });
});
rabbitMQ.connect()
    .then(() => {
        app.listen(port, () => {
            console.log('Producer API running on http://localhost:3001');
        });
    })
    .catch((error) => {
        console.error('Failed to start the server:', error);
    });