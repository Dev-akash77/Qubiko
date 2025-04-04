import  express  from 'express';
import { registerController,logiController, getUserProfile, editProfile} from '../Controllers/user.controller.js';
import { secureUser } from '../Middlewares/secureUser.middleware.js';
import { upload } from './../Middlewares/multer.middleware.js';

const router  = express.Router();

router.post("/register",registerController);
router.post("/login",logiController);
router.get("/profile",secureUser,getUserProfile);
router.post("/profile-update",upload.single("image"),secureUser,editProfile);

export const userRouter = router;
  