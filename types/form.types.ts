export type FormField = {
    _key?: string;
    fieldType: string;
    fieldName: string;
    label: { en: string; ur: string; es: string; ar: string };
    placeholder?: { en: string; ur: string; es: string; ar: string };
    required: boolean;
    validation?: {
        minLength?: number;
        maxLength?: number;
        pattern?: string;
        errorMessage?: { en: string; ur: string; es: string; ar: string };
    };
    options?: Array<{
        label: { en: string; ur: string; es: string; ar: string };
        value: string;
    }>;
};

export type FormDataValues = {
    name: string;
    description: string;
    fields: FormField[];
    submitButtonText: { en: string; ur: string; es: string; ar: string };
    successMessage: { en: string; ur: string; es: string; ar: string };
};
