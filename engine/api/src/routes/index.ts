import {Router, Request, Response} from "express";
import auth from "./auth";
import user from "./user";

const routes = Router();



routes.use("/api/auth", auth);
routes.use("/api/user", user);

routes.use("/api", (req: Request, res: Response) => {
    return res.status(200).send({
        "status": 200, "message": "Welcom to stein api"
    });
});


export default routes;
