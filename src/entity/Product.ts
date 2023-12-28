import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { Category } from './Category';

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    price:number;
    
    @Column()
    description:string;

    @Column()
    image:string;

    @Column()
    countInStock:number;

    @ManyToOne(() => Category, category => category.name)
    category:Category;

}