import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import express from "express";
import { Request, Response } from "express";
import routes from "../api";
const app = express();

app.use(
	cors({
		credentials: true,
		origin: true,
	})
);
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routing
app.use("/api/v1", routes);
app.use("*", (req: Request, res: Response) => res.status(404).send("Not Found"));

app.use((err: any, req: Request, res: Response) => {
	console.log(err);
	const { statusCode = 500 } = err;
	if (!err.message) err.message = "500 Internal Server Error";
	res.status(statusCode).send(err);
});

export default app;
