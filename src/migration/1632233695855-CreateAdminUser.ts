import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { User } from "../entity/User";

export class CreateAdminUser1632233695855 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    let user = new User();
    user.username = "admin";
    user.email= "admin@gmail.com"
    user.password = "admin";
    user.hashPassword();
    user.role = "ADMIN";
    const userRepository = getRepository(User);
    await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
