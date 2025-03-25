import  express  from 'express';
import { registerController,logiController, queryPrompt} from '../Controllers/user.controller.js';

const router  = express.Router();

router.post("/register",registerController);
router.post("/login",logiController);
router.post("/qubiko",queryPrompt);

export const userRouter = router;
 