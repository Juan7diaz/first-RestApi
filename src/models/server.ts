import express from 'express';
import cors from 'cors'

import userRoutes from '../routes/users.routes'

class Server{

  port: string | undefined;
  app: any;

  constructor(){
    this.app = express();
    this.port = process.env.PORT;

    // Middlewares
    this.middlewares()

    // Routes
    this.routes()
  }

  middlewares(){
    this.app.use( express.static('public'))
    this.app.use(cors())
  }

  routes(){
    this.app.use('/api/users', userRoutes)
  }

  listen(){
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    })
  }

}

export default Server;