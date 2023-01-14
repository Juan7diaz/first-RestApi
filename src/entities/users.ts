import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import Roles from './roles'

@Entity()
class Users {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({default: null})
    img: string

    @ManyToOne(() => Roles, (rol) => rol.name)
    role: Roles

    @Column({default: true})
    state: boolean

    @Column({default: false})
    google: boolean
}

export default Users