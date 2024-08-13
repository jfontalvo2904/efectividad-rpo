export default interface Client{
    id:             number;
    name:           string;
    business_name:  null | string;
    nit:            string;
    date_intro:     string | null;
    is_active:      boolean;
    ans_submission: number;
    ans_closing:    number;
}
