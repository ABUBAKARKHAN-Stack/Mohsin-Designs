"use client"
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { roleDescriptions, roleLabels, useSession } from '@/context/SessionContext';
import { Roles } from '@/types/auth.types';

const RoleOverview = () => {
    const {
        users
    } = useSession()
    return (
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
            {(Object.keys(roleLabels) as Roles[]).map((role) => {
                const count = users.filter((u) => u.role === role).length;
                return (
                    <Card key={role}>
                        <CardHeader className="pb-2">
                            <CardDescription>{roleLabels[role]}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{count}</div>
                            <p className="text-xs text-muted-foreground truncate">
                                {roleDescriptions[role]}
                            </p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    )
}

export default RoleOverview