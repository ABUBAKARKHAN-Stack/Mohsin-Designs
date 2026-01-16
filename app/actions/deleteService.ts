'use server'

import { adminClient } from "@/sanity/lib/admin-client"
import { revalidatePath } from "next/cache"

export async function deleteService(id: string) {
    try {
        if (!id) {
            return { success: false, error: "Service ID is required" }
        }

        await adminClient.delete(id)
        return { success: true }

    } catch (error: any) {
        console.error("Failed to delete service:", error)
        return { success: false, error: error.message }
    }
}
export async function deleteMultipleServices(ids: string[]) {
    try {
        if (!ids || ids.length === 0) {
            return { success: false, error: "Service IDs are required" }
        }

        const transaction = adminClient.transaction()
        ids.forEach(id => transaction.delete(id))
        await transaction.commit()

        revalidatePath('/admin/services')
        revalidatePath('/[lang]/services/[slug]', 'page')
        return { success: true }

    } catch (error: any) {
        console.error("Failed to delete services:", error)
        return { success: false, error: error.message }
    }
}
