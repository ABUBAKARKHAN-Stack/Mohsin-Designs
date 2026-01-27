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
            if (['_rev', '_createdAt', '_updatedAt', '_id', '_type'].includes(key)) continue;

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

const flattenToPatch = (obj: any, prefix = ""): any => {
    const patch: any = {};

    const recurse = (obj: any, prefix = "") => {
        if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return;

        for (const key in obj) {
            if (key === '_id' || key === '_type') continue;
            const val = obj[key];
            const fullKey = prefix ? `${prefix}.${key}` : key;

            if (val !== null && typeof val === 'object' && !Array.isArray(val) && !val._type) {
                recurse(val, fullKey);
            } else {
                patch[fullKey] = val;
            }
        }
    };

    recurse(obj, prefix);
    return patch;
};

export async function saveBlogDraft(id: string, data: Partial<BlogPostValues>) {
    try {
        if (!id) return { success: false, error: "ID required for draft" }

        // Normalize ID to prevent recursive 'drafts.drafts.' occurrences
        const cleanId = id.replace(/^(drafts\.)+/, '');
        const draftId = `drafts.${cleanId}`;

        // Sanitize data
        const sanitizedData = sanitizeSanityData(data);

        // Build surgical patch
        const toSet: any = {};
        const toUnset: string[] = [];

        // 1. Localized Basic Fields (Title, Description, Tags)
        if (sanitizedData.title) Object.assign(toSet, flattenToPatch(sanitizedData.title, 'title'));
        if (sanitizedData.description) Object.assign(toSet, flattenToPatch(sanitizedData.description, 'description'));

        // 2. Tags
        if (sanitizedData.tags) {
            ['en', 'ur', 'es', 'ar'].forEach(lang => {
                if (typeof sanitizedData.tags[lang] === 'string') {
                    toSet[`tags.${lang}`] = sanitizedData.tags[lang].split(',').map((t: string) => t.trim()).filter(Boolean);
                }
            });
        }

        // 3. Featured & Metadata
        if (typeof sanitizedData.featured === 'boolean') toSet.featured = sanitizedData.featured;
        if (sanitizedData.author) toSet.author = sanitizedData.author;
        if (typeof sanitizedData.readTime === 'number') toSet.readTime = sanitizedData.readTime;
        if (sanitizedData.publishedAt) toSet.publishedAt = sanitizedData.publishedAt;

        // 4. References (Location, Service)
        if (sanitizedData.location) {
            if (sanitizedData.location === 'none') {
                toUnset.push('location');
            } else {
                toSet.location = { _type: 'reference', _ref: sanitizedData.location };
            }
        }
        if (sanitizedData.service) {
            if (sanitizedData.service === 'none') {
                toUnset.push('service');
            } else {
                toSet.service = { _type: 'reference', _ref: sanitizedData.service };
            }
        }

        // 5. Categories
        if (Array.isArray(sanitizedData.categories)) {
            toSet.categories = sanitizedData.categories
                .filter((catId: string) => typeof catId === 'string' && catId !== 'none')
                .map((catId: string) => ({
                    _type: 'reference',
                    _ref: catId,
                    _key: catId
                }));
        }

        // 6. Main Image - SURGICAL
        if (sanitizedData.mainImage?._id) {
            toSet.mainImage = {
                _type: 'image',
                asset: { _type: 'reference', _ref: sanitizedData.mainImage._id }
            };
        }

        // 7. Body Content
        if (sanitizedData.body) {
            ['en', 'ur', 'es', 'ar'].forEach(lang => {
                if (Array.isArray(sanitizedData.body[lang])) {
                    toSet[`body.${lang}`] = sanitizedData.body[lang];
                }
            });
        }

        if (Object.keys(toSet).length === 0 && toUnset.length === 0) {
            return { success: true, message: "No changes to save" };
        }

        // Ensure the base document exists
        await adminClient.createIfNotExists({
            _id: draftId,
            _type: 'post'
        });

        const patch = adminClient.patch(draftId).set(toSet);
        if (toUnset.length > 0) patch.unset(toUnset);
        const result = await patch.commit();

        console.log("Blog draft successfully patched:", result._id);
        return { success: true }
    } catch (error: any) {
        console.error("CRITICAL ERROR: Failed to save blog draft:", error);
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
