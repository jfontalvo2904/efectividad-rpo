import SelectData from "../../shared/interfaces/SelectData.interface";
import Role from "../interfaces/Role.interface";

export default class UserUtils {

    static selectRoles(roles:Role[]):SelectData[] {
        return roles.map( role => ({viewValue: role.name, value: role.id}))
    }
}