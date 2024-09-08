import Client from "../interfaces/Client.interface";
import SelectData from "../../shared/interfaces/SelectData.interface";
import Leader from "../interfaces/Leader.interface";

export default class ClientUtils {

    static selectClients(clients: Client[]): SelectData[] {
        return clients.map( client => ({
            viewValue: client.name,
            value: client.id ? client.id : ''
        }) )
    }

    static selectLeaders(leaders: Leader[]) {
        return leaders.map( leader => ({
            viewValue: leader.user_name,
            value:leader.user
        }) )
    }
}