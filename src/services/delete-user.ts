import fs from 'fs'
import { FILE_LOCATION } from '../config';
import { DeleteUserResponse } from '../types';

const deleteUser = (userId: string): DeleteUserResponse => {
    try {
        const noUserFound = { message: `userId - ${userId} does not exist` }

        if (!fs.existsSync(FILE_LOCATION)) return noUserFound

        const users = fs.readFileSync(FILE_LOCATION);
        const usersJson = JSON.parse(users.toString())
        if (usersJson[userId]) {
            delete usersJson[userId]
            fs.writeFileSync(FILE_LOCATION, JSON.stringify(usersJson))
            return { message: `userId - ${userId} deleted successfully` }
        } else {
            return noUserFound
        }
    } catch (ex) {
        console.log(`Error while deleting user`, ex)
        throw ex;
    }
}

export { deleteUser }