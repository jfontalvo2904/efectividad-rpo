import { AbstractControl, FormControl } from "@angular/forms";
import { Moment } from "moment";

export default interface CreateVacancyForm {
    name:                   FormControl<string | null>
    number_openings:        FormControl<number|null>;
    assignment_date:        FormControl<Moment|null>;
    management_periodo:     FormControl<string|null>; 
    sector_id:              FormControl<number|null>;
    responsible:            FormControl<number|null>;
    role_responsible:       FormControl<number|null>;
    client:                 FormControl<number|null>;
    leader:                 FormControl<number|null>;
    vacancy_type:           FormControl<number|null>;
    status:                 FormControl<number|null>;
}