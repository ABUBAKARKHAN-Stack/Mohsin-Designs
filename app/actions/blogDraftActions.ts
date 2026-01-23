'use server'

import { blogPostSchema, BlogPostValues } from "@/lib/validations/blog"
import { adminClient } from "@/sanity/lib/admin-client"

const sanitizeSanityData = (data: any): any => {
    if (Array.isArray(data)) {
        return data.map(sanitizeSanityData);
    }
    if (data !== null && typeof data === 'object') {
        const cleaned: any = {};
        for (const key in data) {
            // Strip Sanity internal fields and restricted keys
            if (['_rev', '_createdAt', '_updatedAt'].includes(key)) continue;

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

export async function saveBlogDraft(id: string, data: Partial<BlogPostValues>) {
    try {
        if (!id) return { success: false, error: "ID required for draft" }

        // Normalize ID to prevent recursive 'drafts.drafts.' occurrences
        const cleanId = id.replace(/^(drafts\.)+/, '');
        const draftId = `drafts.${cleanId}`;

        // Sanitize data to remove any incorrectly nested 'url' keys in references
        const sanitizedData = sanitizeSanityData(data);

        const updateData: any = {
            ...sanitizedData,
            _type: 'post',
            _id: draftId,
        }

        // Handle Slug object
        if (updateData.slug) {
            updateData.slug = {
                _type: 'slug',
                current: typeof updateData.slug === 'string' ? updateData.slug : (updateData.slug.current || "")
            }
        }

        // Handle tags strings to arrays
        if (updateData.tags) {
            updateData.tags = {
                en: typeof updateData.tags.en === 'string' ? updateData.tags.en.split(',').map((t: string) => t.trim()).filter(Boolean) : (updateData.tags.en || []),
                ur: typeof updateData.tags.ur === 'string' ? updateData.tags.ur.split(',').map((t: string) => t.trim()).filter(Boolean) : (updateData.tags.ur || []),
                es: typeof updateData.tags.es === 'string' ? updateData.tags.es.split(',').map((t: string) => t.trim()).filter(Boolean) : (updateData.tags.es || []),
                ar: typeof updateData.tags.ar === 'string' ? updateData.tags.ar.split(',').map((t: string) => t.trim()).filter(Boolean) : (updateData.tags.ar || [])
            };
        }

        const toUnset: string[] = [];

        // Handle References (Location, Service)
        if (updateData.location) {
            if (updateData.location === 'none') {
                toUnset.push('location');
                delete updateData.location;
            } else if (typeof updateData.location === 'string') {
                updateData.location = { _type: 'reference', _ref: updateData.location };
            }
        }

        if (updateData.service) {
            if (updateData.service === 'none') {
                toUnset.push('service');
                delete updateData.service;
            } else if (typeof updateData.service === 'string') {
                updateData.service = { _type: 'reference', _ref: updateData.service };
            }
        }

        // Handle Categories array of references
        if (Array.isArray(updateData.categories)) {
            updateData.categories = updateData.categories
                .filter((catId: string) => typeof catId === 'string' && catId !== 'none')
                .map((catId: string) => ({
                    _type: 'reference',
                    _ref: catId,
                    _key: catId
                }));
        }

        // Handle Main Image asset reference - RESTORED
        if (updateData.mainImage?._id) {
            updateData.mainImage = {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: updateData.mainImage._id
                }
            };
        } else if (updateData.mainImage?.asset?._ref) {
            // Already a valid image structure, just ensure it's correct
            updateData.mainImage = {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: updateData.mainImage.asset._ref
                }
            };
        } else {
            // If mainImage is null or empty, unset it
            toUnset.push('mainImage');
            delete updateData.mainImage;
        }

        // Create the draft document if it doesn't exist, then patch it
        // This is more robust than createOrReplace as it allows partial updates if needed
        // though we currently send the full form state.

        console.log(`Saving draft to Sanity: ${draftId}`);

        // Ensure the base document exists (with at least _type)
        await adminClient.createIfNotExists({
            _id: draftId,
            _type: 'post'
        });

        // Clean updateData for patch (remove _id and _type to be safe, though patch handles it)
        const { _id, _type, ...patchData } = updateData;

        const patch = adminClient.patch(draftId).set(patchData);
        if (toUnset.length > 0) patch.unset(toUnset);
        const result = await patch.commit();

        console.log("Draft successfully patched:", result._id);
        return { success: true }
    } catch (error: any) {
        console.error("CRITICAL ERROR: Failed to save blog draft to Sanity:", error);
        // Include more details if available
        if (error.details) {
            console.error("Error details:", JSON.stringify(error.details, null, 2));
        }
        return { success: false, error: error.message || "Failed to save draft" }
    }
}

export async function getBlogDraft(id: string) {
    try {
        if (!id) return null
        const draft = await adminClient.getDocument(`drafts.${id}`)

        if (draft && draft.tags) {
            draft.tags = {
                en: Array.isArray(draft.tags.en) ? draft.tags.en.join(", ") : (draft.tags.en || ""),
                ur: Array.isArray(draft.tags.ur) ? draft.tags.ur.join(", ") : (draft.tags.ur || ""),
                es: Array.isArray(draft.tags.es) ? draft.tags.es.join(", ") : (draft.tags.es || ""),
                ar: Array.isArray(draft.tags.ar) ? draft.tags.ar.join(", ") : (draft.tags.ar || "")
            };
        }

        return draft
    } catch (error: any) {
        if (error.statusCode === 404) return null
        console.error("Failed to fetch blog draft:", error)
        return null
    }
}
