import { Query } from "../index";
import { Users } from "../../types";



const create = (new_user: Users) => {
    return Query(`INSERT INTO Books SET ?`, [new_user]);
}


const getUserBy = (column_name: string, value: string | number) =>
    Query<Users[]>("SELECT * FROM Users WHERE ??=?", [column_name, value]);

export default {

    create,
    getUserBy


};