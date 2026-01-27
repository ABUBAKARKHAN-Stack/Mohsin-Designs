'use server'

import { serviceFormSchema, ServiceFormValues } from "@/lib/validations/service"
import { adminClient } from "@/sanity/lib/admin-client"
import { revalidatePath } from "next/cache"

const sanitizeSanityData = (data: any): any => {
    if (Array.isArray(data)) {
        return data.map(sanitizeSanityData);
    }
    if (data !== null && typeof data === 'object') {
        const cleaned: any = {};
        for (const key in data) {
            // If this is a reference object, don't allow 'url' key
            if (key === 'url' && data._type === 'reference') {
                continue;
            }
            cleaned[key] = sanitizeSanityData(data[key]);
        }
        return cleaned;
    }
    return data;
};

export async function saveServiceDraft(id: string, data: Partial<ServiceFormValues>) {
    try {
        if (!id) return { success: false, error: "ID required for draft" }

        // Sanitize data to remove any incorrectly nested 'url' keys in references
        const sanitizedData = sanitizeSanityData(data);

        const updateData: any = {
            ...sanitizedData,
            _type: 'service',
            _id: `drafts.${id}`,
        }

        // Transform numeric/object fields if necessary (consistent with updateService)
        if (updateData.slug) {
            updateData.slug = { _type: 'slug', current: updateData.slug }
        }

        await adminClient.createOrReplace(updateData)
        return { success: true }
    } catch (error: any) {
        console.error("Failed to save service draft:", error)
        return { success: false, error: error.message || "Failed to save draft" }
    }
}

export async function getServiceDraft(id: string) {
    try {
        if (!id) return null
        const draft = await adminClient.getDocument(`drafts.${id}`)
        return draft
    } catch (error: any) {
        if (error.statusCode === 404) return null
        console.error("Failed to fetch service draft:", error)
        return null
    }
}

export async function discardServiceDraft(id: string) {
    try {
        if (!id) return { success: false, error: "ID required" }
        await adminClient.delete(`drafts.${id}`)
        revalidatePath(`/admin/services/edit/${id}`)
        return { success: true }
    } catch (error: any) {
        console.error("Failed to discard service draft:", error)
        return { success: false, error: error.message || "Failed to discard draft" }
    }
}
