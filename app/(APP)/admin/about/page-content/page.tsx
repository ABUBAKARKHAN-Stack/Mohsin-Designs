import { getAboutPageContentForAdmin, getAboutPageDraft } from "@/app/actions/aboutPageContent";
import { AboutPageContentForm } from "@/components/admin/form/AboutPageContentForm";

// Force this page to be dynamic (no caching)
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AboutPageContentPage() {
    // Try to load draft first, fallback to published content
    const draft = await getAboutPageDraft();
    const published = await getAboutPageContentForAdmin();

    const pageContent = draft || published;
    const hasDraft = !!draft;
    const draftUpdatedAt = draft?._updatedAt ? new Date(draft._updatedAt).toISOString() : null;

    const initialData = pageContent ? {
        hero: pageContent.hero || {},
        intro: pageContent.intro || {},
        missionVision: pageContent.missionVision || {},
        philosophy: pageContent.philosophy || {},
        globalReach: pageContent.globalReach || {},
        culture: pageContent.culture || {},
    } : undefined;

    return (
        <div className="container mx-auto pb-10">
            <AboutPageContentForm
                initialData={initialData as any}
                hasDraft={hasDraft}
                draftUpdatedAt={draftUpdatedAt}
            />
        </div>
    );
}
