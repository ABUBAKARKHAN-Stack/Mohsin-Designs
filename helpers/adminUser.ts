import { AddUserFormValues } from "@/schemas/auth.schema";
import { Roles } from "@/types/auth.types";
import { authClient } from "@/lib/auth-client";
import { rolePermissions } from "@/constants/admin.constants";

export const listUsers = async () => {
    const { data, error } = await authClient.admin.listUsers({
        query: {
            searchOperator: "contains",
            sortBy: "name",
            sortDirection: "desc",
        },
    });
    if (error) return []
    return data?.users ?? [];
};

export const createUser = async (values: AddUserFormValues) => {
    const permissions = rolePermissions[values.role];

    const { error } = await authClient.admin.createUser({
        email: values.email,
        name: values.fullName,
        password: values.password,
        role: values.role as any,
        data: {
            permissions,
            emailVerified: true,
        },
    });

    if (error) {
        throw error
    }
};

export const deleteUser = async (userId: string) => {
    const { error } = await authClient.admin.removeUser({ userId })
    if (error) {
        throw error
    }

};

export const changeUserRole = async ({
    userId,
    role,
}: {
    userId: string;
    role: Roles;
}) => {
    const { error } = await authClient.admin.setRole({
        userId,
        role: role as any,
    });
    if (error) {
        throw error
    }
};
