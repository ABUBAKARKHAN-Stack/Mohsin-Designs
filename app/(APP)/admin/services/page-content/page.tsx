import { getServicesPageContentForAdmin } from "@/app/actions/servicesPageContent";
import { ServicesPageContentForm } from "@/components/admin/form/ServicesPageContentForm";

export default async function ServicesPageContentPage() {
    const pageContent = await getServicesPageContentForAdmin();

    const initialData = pageContent ? {
        hero: pageContent.hero || {},
        intro: pageContent.intro || {},
        process: {
            sectionHeading: pageContent.process?.sectionHeading || {},
            steps: pageContent.process?.steps || [],
        },
        whyChooseUs: {
            sectionHeading: pageContent.whyChooseUs?.sectionHeading || {},
            guaranteePoints: pageContent.whyChooseUs?.guaranteePoints || [],
            benefits: pageContent.whyChooseUs?.benefits || [],
        },
    } : undefined;

    return (
        <div className="container mx-auto pb-10">
            <ServicesPageContentForm initialData={initialData as any} />
        </div>
    );
}
