import Leader from '../../clients/interfaces/Leader.interface';
export default interface UpdateVacancyRequest {
    client:number,
    leader:number,
    assignment_date:string,
    deadline:string,
    number_openings:number,
    cancelled:number,
    suspended:number,
    filled:number,
    ffilled_on_time:number,
    filled_late:number,
    closing_date:string | null,
    preselection:number,
    successful_screening:number,
    interviewed_consultant:number
    sent_to_the_client:number,
    approved_by_client:number,
    approval_target:number | null,
    observations:string | null
}

