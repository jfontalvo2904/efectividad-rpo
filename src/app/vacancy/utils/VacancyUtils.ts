import SelectData from "../../shared/interfaces/SelectData.interface";
import Sector from "../interfaces/Sector.interface";
import SupportStaffByClientResponse from "../interfaces/SupportStaffByClientResponse";
import VacancyStatus from "../interfaces/VacancyStatus.interface";
import VacancyType from "../interfaces/VacancyType.interface";

export default class VacancyUtils {

    static selectSector( sectors: Sector[]): SelectData[] {
        return sectors.map( sector => ({viewValue: sector.name, value: sector.id}));
    }

    static selectVacancyType(types: VacancyType[]): SelectData[] {
        return types.map( type => ({value: type.id, viewValue: type.name}))
    }

    static selectVacancyStatus(status: VacancyStatus[]): SelectData[]{
        return status.map( state => ({viewValue: state.name, value:state.id} ));
    }

    static selectSupportStaffByClientResponse(supports: SupportStaffByClientResponse[]) {
        return supports.map( support => ({viewValue: support.user_name, value:support.user} ));
    }
}