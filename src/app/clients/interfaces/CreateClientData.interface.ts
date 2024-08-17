export default interface CreateClientData{
    nit:             string;
    name:            string;
    business_name?:  string;
    date_intro?:     string;
    is_active?:      boolean;
    ans_submission?: number;
    ans_closing?:    number;
}