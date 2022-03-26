import { Server } from '@hapi/hapi';
import { usersRoutes } from './routes/user.routes'

require('dotenv').config()


export const init = async () => {

    const server = new Server({
        port: 3000,
        host: 'localhost',
    });

    usersRoutes(server);

    await server.start();
    console.log('Server runningo on %s', server.info.uri);
}