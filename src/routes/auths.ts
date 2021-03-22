import UserInputValidation from '../helpers/authValidation';
import verifyEmail from '../helpers/verifyEmail';
import verifyUserEmail from '../helpers/verifyUserEmail';
import { authorizeUser } from '../helpers/authorize';
import AuthsCtrl from "../controllers/auths"

const AuthsController = new AuthsCtrl();

export default (app: any) => {
  app.post('/auth/signup', UserInputValidation.signUpInputValidation, verifyEmail, AuthsController.signup);
  app.post('/auth/login', UserInputValidation.signInInputValidation, verifyUserEmail, AuthsController.login);
};
