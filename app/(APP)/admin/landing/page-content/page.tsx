import { getLandingPageContentForAdmin, getLandingPageDraft } from "@/app/actions/landingPageContent";
import { LandingPageContentForm } from "@/components/admin/form/LandingPageContentForm";

// Force this page to be dynamic (no caching)
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function LandingPageContentPage() {
    // Try to load draft first, fallback to published content
    const draft = await getLandingPageDraft();
    const published = await getLandingPageContentForAdmin();

    const pageContent = draft || published;
    const hasDraft = !!draft;
    const draftUpdatedAt = draft?._updatedAt ? new Date(draft._updatedAt).toISOString() : null;

    console.log('Page loaded - Has draft:', hasDraft, 'Draft updated:', draftUpdatedAt)

    const initialData = pageContent ? {
        hero: pageContent.hero || {},
        servicesPreview: pageContent.servicesPreview || {},
        portfolioPreview: pageContent.portfolioPreview || {},
        aboutPreview: pageContent.aboutPreview || {},
        stats: pageContent.stats || {},
        whyChooseUs: pageContent.whyChooseUs || {},
        blogPreview: pageContent.blogPreview || {},
        faqs: pageContent.faqs || {},
        serviceHighlightsMarquee: pageContent.serviceHighlightsMarquee || {},
        trustedByBrands: pageContent.trustedByBrands || {},
        ourApproach: pageContent.ourApproach || {},
        caseStudiesPreview: pageContent.caseStudiesPreview || {},
        areasWeServe: pageContent.areasWeServe || {},
        industriesWeServe: pageContent.industriesWeServe || {},
        testimonials: pageContent.testimonials || {},
        leadership: pageContent.leadership || {},
    } : undefined;

    return (
        <div className="container mx-auto pb-10">
            <LandingPageContentForm
                initialData={initialData as any}
                hasDraft={hasDraft}
                draftUpdatedAt={draftUpdatedAt}
            />
        </div>
    );
}
