import SupportStaffByClientResponse from "./SupportStaffByClientResponse";
import Vacancy from "./Vacancy.interface";

export default interface DataDialogAddSupportStaff{
    title :string,
    supports: SupportStaffByClientResponse[],
    vacancy:Vacancy
}