import { getGlobalContentForAdmin } from "@/app/actions/globalContent";
import { GlobalContentForm } from "@/components/admin/form/GlobalContentForm";
import { ContainerLayout } from "@/components/layout";

export default async function GlobalSectionsPage() {
    const initialData = await getGlobalContentForAdmin();

    return (
        <ContainerLayout className="py-8">
            <GlobalContentForm initialData={initialData} />
        </ContainerLayout>
    );
}
