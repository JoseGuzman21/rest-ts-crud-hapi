import { Server } from '@hapi/hapi'
import { getUsers, getUser, createUser, updatedUser, deletedUser} from '../controllers/user.controller';

export const usersRoutes = (server: Server) => {

    server.route({
        method: 'GET',
        path: '/users',
        handler: getUsers
    });

    server.route({
        method: 'GET',
        path: '/users/{userId}',
        handler: getUser
    });

    server.route({
        method: 'POST',
        path: '/users',
        handler: createUser
    });

    server.route({
        method: 'PUT',
        path: '/users/{userId}',
        handler: updatedUser
    });

    server.route({
        method: 'DELETE',
        path: '/users/{userId}',
        handler: deletedUser
    });

}