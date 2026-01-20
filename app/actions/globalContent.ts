"use server";

import { adminClient } from "@/sanity/lib/admin-client";
import { revalidatePath } from "next/cache";
import { GLOBAL_CONTENT_FULL_QUERY } from "@/helpers/global-content.helpers";

const GLOBAL_CONTENT_ID = "globalContent";

/**
 * Ensures the Global Content document exists in Sanity.
 */
export async function ensureGlobalContentExists() {
    try {
        const existing = await adminClient.fetch(`*[_id == $id][0]`, { id: GLOBAL_CONTENT_ID });

        if (!existing) {
            console.log("Creating Global Content singleton...");
            await adminClient.createIfNotExists({
                _id: GLOBAL_CONTENT_ID,
                _type: "globalContent",
            });
        }
        return true;
    } catch (error) {
        console.error("Error ensuring global content exists:", error);
        return false;
    }
}

/**
 * Fetches the full Global Content document for administration, including draft info if it exists.
 */
export async function getGlobalContentForAdmin() {
    await ensureGlobalContentExists();

    // Fetch both published and draft if available
    const data = await adminClient.fetch(`{
        "published": *[_id == $id][0],
        "draft": *[_id == "drafts." + $id][0]
    }`, { id: GLOBAL_CONTENT_ID });

    const content = data.draft || data.published;

    return {
        ...content,
        hasDraft: !!data.draft,
        draftUpdatedAt: data.draft?._updatedAt || null
    };
}

export async function saveGlobalContentDraft(data: any) {
    try {
        const updateData: any = {
            _type: 'globalContent',
            _id: `drafts.${GLOBAL_CONTENT_ID}`,
            ...data
        }
        await adminClient.createOrReplace(updateData)
        return { success: true }
    } catch (error: any) {
        console.error("Failed to save global content draft:", error)
        return { success: false, error: error.message || "Failed to save draft" }
    }
}

export async function discardGlobalContentDraft() {
    try {
        await adminClient.delete(`drafts.${GLOBAL_CONTENT_ID}`)
        revalidatePath('/admin/global')
        return { success: true }
    } catch (error: any) {
        console.error("Failed to discard global content draft:", error)
        return { success: false, error: error.message || "Failed to discard draft" }
    }
}

/**
 * Updates the Global Content document.
 */
export async function updateGlobalContent(data: any) {
    try {
        await adminClient
            .patch(GLOBAL_CONTENT_ID)
            .set(data)
            .commit();

        // Delete draft if it was successfully published
        await adminClient.delete(`drafts.${GLOBAL_CONTENT_ID}`).catch(() => { });

        revalidatePath("/", "layout");
        revalidatePath("/admin/global");
        return { success: true };
    } catch (error) {
        console.error("Error updating global content:", error);
        return { success: false, error: (error as Error).message };
    }
}

/**
 * Migrates shared sections from landingPageContent to globalContent.
 * This is a one-time operation to ensure zero data loss.
 */
export async function migrateSharedContent() {
    try {
        // 1. Fetch existing landing page content
        const landingPage = await adminClient.fetch(`*[_type == "landingPageContent"][0]`);

        if (!landingPage) {
            return { success: false, error: "No landing page content found to migrate." };
        }

        // 2. Identify shared sections
        const sharedSections = {
            stats: landingPage.stats,
            servicesPreview: landingPage.servicesPreview,
            whyChooseUs: landingPage.whyChooseUs,
            ourApproach: landingPage.ourApproach,
            industriesWeServe: landingPage.industriesWeServe,
            leadership: landingPage.leadership,
            cta: landingPage.cta,
        };

        // 3. Ensure global content exists
        await ensureGlobalContentExists();

        // 4. Update global content with shared data
        await adminClient
            .patch(GLOBAL_CONTENT_ID)
            .set(sharedSections)
            .commit();

        // 5. Clear draft if exists
        await adminClient.delete(`drafts.${GLOBAL_CONTENT_ID}`).catch(() => { });

        console.log("Migration complete: Shared sections moved to Global Content.");

        revalidatePath("/", "layout");
        return { success: true, message: "Shared content migrated successfully." };
    } catch (error) {
        console.error("Migration failed:", error);
        return { success: false, error: (error as Error).message };
    }
}
