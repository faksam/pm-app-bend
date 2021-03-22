import { Request, Response, Router } from 'express';
import userRoute from "./users";
import productRoute from "./products";
import authRoute from "./auths";

const app: Router = Router()

authRoute(app);
userRoute(app);
productRoute(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the product management application!!!');
});

export default app;