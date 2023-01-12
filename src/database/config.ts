import { DataSource } from "typeorm";
import Users from '../entities/users'


const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  username: "postgres",
  password: "password",
  port: 5432,
  database: "CoffeeApi",
  entities: [Users],
  //logging: true,
  synchronize: true,
});

export default AppDataSource
