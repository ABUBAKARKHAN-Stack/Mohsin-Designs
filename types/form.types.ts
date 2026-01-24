import { SanityImageWithAlt } from './image.types';

export interface PortfolioPageContentData {
    hero: {
        title: string;
        subtitle: string;
        description: string;
    };
    portfolioList: {
        projects: Project[];
    };
    cta: {
        sectionHeading?: {
            eyebrow?: string;
            title: string;
            description?: string;
        };
        form: any;
    };
}

export interface Project {
    _id: string;
    title: string;
    slug: string;
    category: string;
    description: string;
    image: SanityImageWithAlt;
}

export type FormField = {
    _key?: string;
    fieldType: string;
    fieldName: string;
    label: string | { [key: string]: string };
    placeholder?: string | { [key: string]: string };
    required: boolean;
    validation?: string;
    options?: { label: string | { [key: string]: string }; value: string }[];
};

export type FormData = {
    _id: string;
    name: string;
    submitButtonText: string | { [key: string]: string };
    successMessage: string | { [key: string]: string };
    fields: FormField[];
};
