import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
class Users {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    img: string

    @Column()
    role: string

    @Column({default: true})
    state: boolean

    @Column({default: false})
    google: boolean
}

export default Users