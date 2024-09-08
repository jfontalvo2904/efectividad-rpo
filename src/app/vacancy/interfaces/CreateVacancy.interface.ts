export default interface CreateVacancy {
    name:                   string;
    number_openings:        number;
    assignment_date:        string;
    management_periodo:     string; 
    sector_id:              number;
    responsible:            number;
    role_responsible:       number;
    client:                 number;
    leader:                 number;
    vacancy_type:           number;
    status:                 number|null;
}