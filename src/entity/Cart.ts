import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { Product } from './Product';
import { User } from './User';


@Entity()
export class Cart{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    quantity:number;

    @Column()
    price:number;
    
    @Column()
    total:number;

    @Column()
    subtotal:string;

    @ManyToOne(() => Product, product => product.id)
    productId:number;
    
    @ManyToOne(() => User, user => user.id)
    userId:number;

}