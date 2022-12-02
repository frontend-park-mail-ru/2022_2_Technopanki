export type ApplicantResponse = {
    id: number;
    applicant_name: string;
    applicant_surname: string;
    company_size: number;
    contact_number: string;
    date_of_birth: string;
    description: string;
    email: string;
    image: string;
    is_confirmed: boolean;
    mailing_approval: boolean;
    password: string;
    public_fields: string;
    resumes: null;
    status: string;
    two_factor_sign_in: boolean;
    user_type: 'applicant' | 'employer';
    vacancies: null;
    vacancy_activities: null;
};

export type EmployerResponse = {
    id: number;
    company_name: string;
    company_size: number;
    contact_number: string;
    date_of_birth: string;
    description: string;
    email: string;
    image: string;
    is_confirmed: boolean;
    mailing_approval: boolean;
    password: string;
    public_fields: string;
    resumes: null;
    status: string;
    two_factor_sign_in: boolean;
    user_type: 'applicant' | 'employer';
    vacancies: null;
    vacancy_activities: null;
    business_type: string;
    location: string;
};

export type SignInResponse = ApplicantResponse & EmployerResponse;

export type SignUpResponse = {};

export type ConfirmResponse = ApplicantResponse & EmployerResponse;

export type AuthError = {
    descriptors: string | string[];
    error: string;
};
