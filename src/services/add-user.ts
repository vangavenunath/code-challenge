import fs from 'fs'

import * as crypt from 'crypto'
import { User } from '../types';
import { FILE_LOCATION } from '../config';

const addUserInFile = (data: User): void => {
    try {
        const userId = crypt.randomUUID({disableEntropyCache: true});
        if(!fs.existsSync(FILE_LOCATION)) {
            fs.writeFileSync(FILE_LOCATION, JSON.stringify({[userId]: data}))
        } else {
            const users = fs.readFileSync(FILE_LOCATION);
            const usersJson = JSON.parse(users.toString())
            const newUsers = { [userId]: data, ...usersJson}
            fs.writeFileSync(FILE_LOCATION, JSON.stringify(newUsers))
        }
    } catch(ex) {
        console.log(`Error while adding user`, ex)
        throw ex;
    }
}

export {addUserInFile}