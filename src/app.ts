import express, { Express, Request, Response } from 'express';
import { router } from './routes/users';

const app: Express = express();
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Root path');
});
app.use('/users', router);
app.use((req: Request, res: Response
  , next) => {
  res.status(404).json({
    message: "Route not found"
  })
});

export {app};

