"use client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MoreHorizontal } from "lucide-react";
import { Roles } from "@/types/auth.types";
import UsersTableSkeleton from "./UsersTableSkeleton";
import UsersError from "./UsersError";
import { roleLabels } from "@/constants/admin.constants";
import { useAdminUsers, useDeleteUser } from "@/hooks/useAdminUser";
import { Skeleton } from "@/components/ui/skeleton";
import ChangeUserRoleModal from "./ChangeRoleDialog";
import { useSession } from "@/context/SessionContext";


const UsersTable = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const {
        data: users,
        isLoading,
        isError,
    } = useAdminUsers();
    const deleteUser = useDeleteUser() //* Mutation

    const filteredUsers = (users ?? []).filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const {
        session
    } = useSession()

    const showEmptyState = !isLoading && filteredUsers.length === 0;

    const handleUserDelete = (userId: string) => {
        const confirmed = confirm(
            "Are you sure? This action cannot be undone."
        );
        if (!confirmed) return;
        deleteUser.mutate(userId)
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <CardTitle>Team Members</CardTitle>

                        <CardDescription>
                            {
                                isLoading ?
                                    <Skeleton className="w-20 h-3" /> :
                                    <>{users?.length} users in total</>
                            }
                        </CardDescription>
                    </div>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search users by name or email"
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {
                            isError ? <UsersError />
                                : isLoading ? <UsersTableSkeleton />
                                    : showEmptyState ? (
                                        <TableRow>
                                            <TableCell colSpan={3} className="py-12 text-center">
                                                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                                    <Search className="h-8 w-8" />
                                                    <p className="font-medium">No users found</p>
                                                    <p className="text-sm">Try a different name or email.</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                        : filteredUsers.map((user) => {
                                            const isCurrentUser = session?.user.id === user.id; // check if this is the logged-in user

                                            return (
                                                <TableRow key={user.id}>
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <Avatar className="h-8 w-8">
                                                                <AvatarFallback>
                                                                    {user.name.split(" ").map((n) => n[0]).join("")}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <p className="font-medium">{user.name}</p>
                                                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">{roleLabels[user.role as Roles]}</Badge>
                                                    </TableCell>

                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem>View Profile</DropdownMenuItem>

                                                                {/* Only show Change Role if it's NOT the logged-in user */}
                                                                {!isCurrentUser && (
                                                                    <ChangeUserRoleModal currentRole={user.role as Roles} userId={user.id}>
                                                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                                            Change Role
                                                                        </DropdownMenuItem>
                                                                    </ChangeUserRoleModal>
                                                                )}

                                                                {/* Only show Edit User if NOT logged-in user */}
                                                                {!isCurrentUser && (
                                                                    <DropdownMenuItem>Edit User</DropdownMenuItem>
                                                                )}

                                                                <DropdownMenuSeparator />

                                                                {/* Optional: prevent self-delete */}
                                                                {!isCurrentUser && (
                                                                    <DropdownMenuItem
                                                                        className="text-destructive"
                                                                        onClick={() => handleUserDelete(user.id)}
                                                                    >
                                                                        Remove User
                                                                    </DropdownMenuItem>
                                                                )}
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })

                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default UsersTable