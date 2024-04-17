import express from 'express';
import { logInUser, logOutUser, signUpUser, gettingData,addingTask,updatingTask ,deletingTask} from '../controller/user.controller.js';
import userProtectingRouter from '../middleware/userProtectingRouter.js'

const router = express.Router();

router.post('/signUpUser', signUpUser);  // ✅

router.post('/logInUser', logInUser);  // ✅

router.get('/logOutUser', logOutUser);  // ✅

// Data retriving
router.get('/getData',userProtectingRouter,gettingData);

// Task Adding
router.post('/addTask',userProtectingRouter,addingTask);

//Update task status
router.put('/updateTask',userProtectingRouter,updatingTask)

//Delete task 
router.delete('/deleteTask',userProtectingRouter,deletingTask);

export default router;