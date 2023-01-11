import express from 'express';
import userRoutes from '../routes/users.routes'

class Server{

  port: string | undefined;
  app: any;

  constructor(){
    this.app = express();
    this.port = process.env.PORT;

    // Routes
    this.routes()
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