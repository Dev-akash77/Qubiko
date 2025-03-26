import  express  from 'express';
import { registerController,logiController, queryPrompt} from '../Controllers/user.controller.js';
import { secureUser } from '../Middlewares/secureUser.middleware.js';

const router  = express.Router();

router.post("/register",registerController);
router.post("/login",logiController);
router.post("/qubiko",secureUser,queryPrompt);

export const userRouter = router;
 