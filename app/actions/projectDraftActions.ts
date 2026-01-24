'use server'

import { projectSchema, ProjectValues } from "@/lib/validations/project"
import { adminClient } from "@/sanity/lib/admin-client"

const sanitizeSanityData = (data: any): any => {
    if (Array.isArray(data)) {
        return data.map(sanitizeSanityData);
    }
    if (data !== null && typeof data === 'object') {
        const cleaned: any = {};
        for (const key in data) {
            if (['_rev', '_createdAt', '_updatedAt'].includes(key)) continue;
            if (key === 'url' && data._type === 'reference') continue;
            cleaned[key] = sanitizeSanityData(data[key]);
        }
        return cleaned;
    }
    return data;
};

export async function saveProjectDraft(id: string, data: Partial<ProjectValues>) {
    try {
        if (!id) return { success: false, error: "ID required for draft" }

        const cleanId = id.replace(/^(drafts\.)+/, '');
        const draftId = `drafts.${cleanId}`;

        const sanitizedData = sanitizeSanityData(data);

        const updateData: any = {
            ...sanitizedData,
            _type: 'project',
            _id: draftId,
        }

        if (updateData.slug) {
            updateData.slug = {
                _type: 'slug',
                current: typeof updateData.slug === 'string' ? updateData.slug : (updateData.slug.current || "")
            }
        }

        const toUnset: string[] = [];

        if (updateData.mainImage?._id) {
            updateData.mainImage = {
                _type: 'image',
                asset: { _type: 'reference', _ref: updateData.mainImage._id }
            };
        } else if (updateData.mainImage?.asset?._ref) {
            updateData.mainImage = {
                _type: 'image',
                asset: { _type: 'reference', _ref: updateData.mainImage.asset._ref }
            };
        } else {
            toUnset.push('mainImage');
            delete updateData.mainImage;
        }

        if (updateData.caseStudy) {
            if (updateData.caseStudy.beforeImage?._id) {
                updateData.caseStudy.beforeImage = {
                    _type: 'image',
                    asset: { _type: 'reference', _ref: updateData.caseStudy.beforeImage._id }
                };
            }
            if (updateData.caseStudy.afterImage?._id) {
                updateData.caseStudy.afterImage = {
                    _type: 'image',
                    asset: { _type: 'reference', _ref: updateData.caseStudy.afterImage._id }
                };
            }

            if (updateData.caseStudy.slug) {
                updateData.caseStudy.slug = {
                    _type: 'slug',
                    current: typeof updateData.caseStudy.slug === 'string' ? updateData.caseStudy.slug : (updateData.caseStudy.slug.current || "")
                }
            }
        }

        await adminClient.createIfNotExists({
            _id: draftId,
            _type: 'project'
        });

        const { _id, _type, ...patchData } = updateData;

        const patch = adminClient.patch(draftId).set(patchData);
        if (toUnset.length > 0) patch.unset(toUnset);
        await patch.commit();

        return { success: true }
    } catch (error: any) {
        console.error("Failed to save project draft:", error);
        return { success: false, error: error.message || "Failed to save draft" }
    }
}

export async function getProjectDraft(id: string) {
    try {
        if (!id) return null
        const draft = await adminClient.getDocument(`drafts.${id}`)
        return draft
    } catch (error: any) {
        if (error.statusCode === 404) return null
        console.error("Failed to fetch project draft:", error)
        return null
    }
}
