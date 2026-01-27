import { ServiceForm } from "@/components/admin/services/ServiceForm"

export default function AddServicePage() {
    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight">Add Service</h1>
                <p className="text-muted-foreground">
                    Create a new service.
                </p>
            </div>
            <ServiceForm />
        </div>
    )
}
