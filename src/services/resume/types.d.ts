type Education = {
    resume_id: number;
    certificate_degree_name: string;
    major: string;
    university_name: string;
    starting_date: string;
    completion_date: string;
};

type ExperienceDetails = {
    resume_id: number;
    is_current_job: string;
    start_date: string;
    end_date: string;
    job_title: string;
    company_name: string;
    job_location_city: string;
    description: string;
};

export type ResumeResponse = {
    id: number;
    user_account_id: number;
    title: string;
    description: string;
    created_date: string;
    education_detail: ExperienceDetails;
    experience_detail: ExperienceDetails;
    applicant_skills: null;
    experience: string;
};

export type ResumePreviewResponse = {
    image: string;
    applicant_name: string;
    applicant_surname: string;
    id: number;
    title: string;
    created_date: string;
};
