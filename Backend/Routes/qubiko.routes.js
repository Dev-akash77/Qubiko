import  express  from 'express';
import { deleteHistory, getHistory } from '../Controllers/qubiko.controller.js';
import { secureUser } from '../Middlewares/secureUser.middleware.js';


const router  = express.Router();
router.get("/history",secureUser,getHistory);
router.post("/history-delete",secureUser,deleteHistory);
export const qubikoRouter = router;   