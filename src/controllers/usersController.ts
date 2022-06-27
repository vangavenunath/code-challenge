import { addUserInFile } from "../services/add-user"
import { Request, Response } from 'express';
import { getUser } from "../services/get-user";
import { deleteUser } from "../services/delete-user";
import { BAD_REQUEST_RESPONSE, INTERNAL_SERVER_ERROR_RESPONSE } from "../constants";
import Joi from 'joi'

const addUser = (req: Request, res: Response): void => {
    try {
        // validate request body
        const validSchema = Joi.object({ name: Joi.string().required(), email: Joi.string().email().required(), dob: Joi.string().required() })
        const {error} = validSchema.validate(req.body)
        const reqBody = req.body
        if (!error) {
            addUserInFile(reqBody);
            res.status(201).send({ message: 'user added successfully' })
        } else {
            res.status(BAD_REQUEST_RESPONSE.status).send(BAD_REQUEST_RESPONSE.data)
        }

    } catch (ex) {
        console.error("Error while adding user", ex)
        res.status(INTERNAL_SERVER_ERROR_RESPONSE.status).send(INTERNAL_SERVER_ERROR_RESPONSE.data)

    }

}

const getUserById = (req: Request, res: Response): void => {
    try {
        const userId = req.params.id;
        if (userId) {
            const userData = getUser(userId);
            res.status(200).send(userData)
        } else {
            res.status(BAD_REQUEST_RESPONSE.status).send(BAD_REQUEST_RESPONSE.data)
        }
    } catch (ex) {
        console.error("Error while getting user", ex)
        res.status(INTERNAL_SERVER_ERROR_RESPONSE.status).send(INTERNAL_SERVER_ERROR_RESPONSE.data)
    }

}
const deleteUserById = (req: Request, res: Response): void => {
    try {
        const userId = req.params.id;
        if (userId) {
            const delResponse = deleteUser(userId)
            res.send(delResponse)
        } else {
            res.status(BAD_REQUEST_RESPONSE.status).send(BAD_REQUEST_RESPONSE.data)
        }

    } catch (ex) {
        console.error("Error while adding user", ex)
        res.status(INTERNAL_SERVER_ERROR_RESPONSE.status).send(INTERNAL_SERVER_ERROR_RESPONSE.data)

    }

}


export { addUser, getUserById, deleteUserById }