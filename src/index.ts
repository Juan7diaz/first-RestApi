import Server from './models/server';
import 'dotenv/config'
import "reflect-metadata"

const server = new Server()
server.listen()

// npx tsc