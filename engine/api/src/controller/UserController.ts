import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {validate} from "class-validator";

import {User} from "../entity/User";
import UserRessource from "../ressource/UserRessource";

class UserController {

    static listAll = async (req: Request, res: Response) => {
        //Get users from database
        const userRepository = getRepository(User);
        const users = await userRepository.find();

        //Send the users object
        res.send({data: UserRessource.collection(users)});
    };

    static getOneByUsername = async (req: Request, res: Response) => {
        //Get the ID from the url
        const username: number = req.params.username;

        //Get the user from database
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({where: {username}});
        } catch (error) {
            res.status(404).send("User not found");
        }

        return res.send(new UserRessource(user));
    };

    static newUser = async (req: Request, res: Response) => {
        //Get parameters from the body
        let {email, description, username, password, role} = req.body;
        let user = new User();
        user.username = username;
        user.email = email;
        user.description = description;
        user.password = password;
        user.role = role;

        //Validade if the parameters are ok
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Hash the password, to securely store on DB
        user.hashPassword();
        //Try to save. If fails, the username is already in use
        const userRepository = getRepository(User);
        try {
            user = await userRepository.save(user);
        } catch (e) {
            res.status(409).send({error: "Email or Username already in use"});
            return;
        }
        return res.status(201).send(new UserRessource(user));
    };

    static editUser = async (req: Request, res: Response) => {
        //Get the ID from the url
        const username = req.params.username;

        //Get values from the body
        const {role, email, description} = req.body;
        const newUsername = req.body.username;

        //Try to find user on database
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({where: {username}});
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("User not found");
            return;
        }

        //Validate the new values on model
        user.username = newUsername;
        user.email = email;
        user.description = description;
        user.role = role;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means username already in use
        try {
            await userRepository.save(user);
        } catch (e) {
            res.status(409).send({error: "Username or email already in use"});
            return;
        }
        //After all send a 204 (no content, but accepted) response
        return res.send(new UserRessource(user));
    };

    static deleteUser = async (req: Request, res: Response) => {
        //Get the ID from the url
        const username = req.params.username;

        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({where: {username}});
        } catch (error) {
            res.status(404).send({error: "User not found"});
            return;
        }
        userRepository.remove(user);

        //After all send a 204 (no content, but accepted) response
        return res.send({
            message: `User with username ${username} has been deleted`
        });
    };
};

export default UserController;
