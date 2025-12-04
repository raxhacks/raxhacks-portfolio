export interface IExperience {
    id: string;
    role: string;
    created_at: Date;
    updated_at: Date;
    description: string | null;
    company_logo_url: string | null;
    company_name: string;
    start_date: Date;
    end_date: Date | null;
}