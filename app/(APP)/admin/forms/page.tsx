import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { adminClient } from "@/sanity/lib/admin-client";

type Form = {
    _id: string;
    name: string;
    description?: string;
    fields: any[];
};

async function getForms(): Promise<Form[]> {
    const forms = await adminClient.fetch(`
        *[_type == "form"] | order(name asc) {
            _id,
            name,
            description,
            "fields": fields[]
        }
    `);
    return forms;
}

export default async function FormsPage() {
    const forms = await getForms();

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Forms</h1>
                    <p className="text-muted-foreground">
                        Create and manage dynamic forms for your website
                    </p>
                </div>
                <Link href="/admin/forms/add">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Form
                    </Button>
                </Link>
            </div>

            {forms.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center">
                        <p className="text-lg text-muted-foreground mb-4">No forms created yet</p>
                        <Link href="/admin/forms/add">
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Create Your First Form
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {forms.map((form) => (
                        <Card key={form._id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle>{form.name}</CardTitle>
                                {form.description && (
                                    <CardDescription>{form.description}</CardDescription>
                                )}
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">
                                        {form.fields?.length || 0} field{form.fields?.length !== 1 ? 's' : ''}
                                    </span>
                                    <Link href={`/admin/forms/edit/${form._id}`}>
                                        <Button variant="outline" size="sm">
                                            Edit
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
