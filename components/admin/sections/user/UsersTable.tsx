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
import { roleLabels, useSession } from "@/context/SessionContext";
import { Roles } from "@/types/auth.types";
import UsersTableSkeleton from "./UsersTableSkeleton";
import UsersError from "./UsersError";


const UsersTable = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const {
        users,
        error,
        loading,
        deleteUser
    } = useSession()

    const filteredUsers = users.filter(
        (user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const isListUserError = error === "list_user";
    const isListUserLoading = loading === "list_users"
    const showEmptyState = !isListUserLoading && filteredUsers.length === 0;

    const handleUserDelete = async (userId: string) => {
        const confirmed = confirm(
            "Are you sure? This action cannot be undone."
        );

        if (!confirmed) return;

        await deleteUser(userId)
    };


    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Team Members</CardTitle>
                        <CardDescription>{users.length} users in total</CardDescription>
                    </div>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search users..."
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
                            isListUserError ? <UsersError />
                                : isListUserLoading ? <UsersTableSkeleton />
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
                                        : filteredUsers.map((user) => (
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
                                                            <DropdownMenuItem>Change Role</DropdownMenuItem>
                                                            <DropdownMenuItem>Edit User</DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem className="text-destructive"
                                                                onClick={() => handleUserDelete(user.id)}
                                                            >
                                                                Remove User
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default UsersTable