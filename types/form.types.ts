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

export type LocalizedString = {
    en: string;
    ur: string;
    es: string;
    ar: string;
    _key?: string;
};

export type FormField = {

    _key?: string;
    fieldType: string;
    fieldName: string;
    label: LocalizedString;
    placeholder?: LocalizedString;
    required: boolean;
    validation?: string;
    options?: { label: LocalizedString; value: string }[];
};

export type FormData = {
    _id: string;
    name: string;
    submitButtonText: LocalizedString;
    successMessage: LocalizedString;
    fields: FormField[];
};
