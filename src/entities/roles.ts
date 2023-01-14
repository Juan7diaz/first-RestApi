import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import Users from './users'

@Entity()
class Roles {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Users, (user) => user.role)
    user: Users[]

}

export default Roles