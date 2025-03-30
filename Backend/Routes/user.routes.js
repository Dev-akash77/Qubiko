import  express  from 'express';
import { registerController,logiController, getUserProfile} from '../Controllers/user.controller.js';
import { secureUser } from '../Middlewares/secureUser.middleware.js';

const router  = express.Router();

router.post("/register",registerController);
router.post("/login",logiController);
router.get("/profile",secureUser,getUserProfile);

export const userRouter = router;
 