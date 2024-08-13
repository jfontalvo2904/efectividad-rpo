export default interface User {
    id:               number;
    last_login:       Date | null;
    is_superuser:     boolean;
    username:         string;
    email:            string;
    name:             string;
    last_name:        string;
    is_active:        boolean;
    number_id:        number;
    role_id:          number | null;
    groups:           any[];
    user_permissions: any[];
}