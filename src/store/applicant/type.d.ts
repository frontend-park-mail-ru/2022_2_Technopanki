export type ProfileState = {
    id: string;
    avatar_src: string;
    applicant_name: string;
    applicant_surname: string;
    status: string;
    contact_number: string;
    email: string;
    location: string;
    date_of_birth: string;
    skills: string[];
    vk: string | null | undefined;
    facebook: string | null | undefined;
    telegram: string | null | undefined;
};
