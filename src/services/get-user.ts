import fs from 'fs'
import path from 'path'
import { FILE_LOCATION } from '../config';
import { GetUserResponse } from '../types';


const getUser = (userId: string): GetUserResponse => {
    try {
        const noUserFound = { message: `userId - ${userId} does not exist` }

        if (!fs.existsSync(FILE_LOCATION)) return noUserFound

        const users = fs.readFileSync(FILE_LOCATION);
        const usersJson = JSON.parse(users.toString())
        if (usersJson[userId]) {
            return { message: "user found", data: usersJson[userId] }
        } else {
            return noUserFound
        }

    } catch (ex) {
        console.log(`Error while fetching user`, ex)
        throw ex;
    }
}

export { getUser }