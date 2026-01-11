"use client"

import { Badge } from "@/components/ui/badge";


import { Shield } from "lucide-react";

import { AddUserDialog, RoleOverview, UsersTable } from "@/components/admin/sections/user";
import { usePermissions } from "@/hooks/usePermissions";



export default function UsersPage() {
    const permissions = usePermissions();


    if (!permissions.users.manage) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <Shield className="h-16 w-16 text-muted-foreground mb-4" />
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p className="text-muted-foreground mt-2">
                    You don't have permission to manage users.
                </p>
                <Badge variant="secondary" className="mt-4">
                    Admin role required
                </Badge>
            </div>
        );
    }


    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                    <p className="text-muted-foreground">
                        Manage team members and their role-based permissions.
                    </p>
                </div>
                <AddUserDialog />
            </div>

            {/* Role Overview */}
            <RoleOverview />

            <UsersTable />
        </div>
    );
}
