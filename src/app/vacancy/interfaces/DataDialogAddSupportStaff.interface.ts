import Role from "../../auth/interfaces/Role.interface";
import SupportStaffByClientResponse from "./SupportStaffByClientResponse";
import Vacancy from "./Vacancy.interface";

export default interface DataDialogAddSupportStaff{
    title :string,
    supports: SupportStaffByClientResponse[],
    supportRoles:Role[];
    vacancy:Vacancy
}