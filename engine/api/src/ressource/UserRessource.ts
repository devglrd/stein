import {User} from "../entity/User";

class UserRessource {

    constructor(user: User) {
        return {
            data: {
                'id': user.id,
                "username": user.username,
                "description": user.description,
                "email": user.email,
                "role": user.role,
                "updatedAt": user.updatedAt,
            }
        }
    }

    static collection(users: User[]) {
        return users.map((user: User) => {
            return {
                'id': user.id,
                "username": user.username,
                "description": user.description,
                "email": user.email,
                "role": user.role,
                "updatedAt": user.updatedAt,
            }
        });
    }
}

export default UserRessource;
