import { Request, Response, Router } from 'express';
import userRoute from "./users";
import productRoute from "./products";
import authRoute from "./auths";
import commentRoute from "./comments";

const app: Router = Router()

authRoute(app);
userRoute(app);
productRoute(app);
commentRoute(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the product management application!!!');
});

export default app;