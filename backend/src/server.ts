import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT || '3000';

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

// Server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});