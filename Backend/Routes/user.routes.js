import  express  from 'express';
import { registerController,logiController, queryPrompt, getUserProfile} from '../Controllers/user.controller.js';
import { secureUser } from '../Middlewares/secureUser.middleware.js';

const router  = express.Router();

router.post("/register",registerController);
router.post("/login",logiController);
router.post("/qubiko",secureUser,queryPrompt);
router.get("/profile",secureUser,getUserProfile);

export const userRouter = router;
 