import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import UserController from "../controller/UserController";
import {checkRole} from "../middlewares/checkRoles";

const router = Router();

//Get all users
router.get("/", [checkJwt, checkRole(["ADMIN"])], UserController.listAll);

// Get one user
router.get(
    "/:username",
    [checkJwt, checkRole(["ADMIN"])],
    UserController.getOneByUsername
);

//Create a new user
router.post("/", [checkJwt, checkRole(["ADMIN"])], UserController.newUser);

//Edit one user
router.put(
    "/:username",
    [checkJwt, checkRole(["ADMIN"])],
    UserController.editUser
);



//Delete one user
router.delete(
    "/:username",
    [checkJwt, checkRole(["ADMIN"])],
    UserController.deleteUser
);


export default router;
