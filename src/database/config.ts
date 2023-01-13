import { DataSource } from "typeorm";
import Users from '../entities/users'
import Roles from '../entities/roles'

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  username: "postgres",
  password: "password",
  port: 5432,
  database: "CoffeeApi",
  entities: [Users, Roles],
  //logging: true,
  synchronize: true,
});

export default AppDataSource
