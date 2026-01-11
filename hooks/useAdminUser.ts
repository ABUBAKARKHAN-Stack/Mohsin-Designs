import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    listUsers,
    createUser,
    deleteUser,
    changeUserRole,
} from "@/helpers/adminUser";
import { AddUserFormValues } from "@/schemas/auth.schema";
import { AdminUserKeys, Roles } from "@/types/auth.types";
import { errorToast, successToast } from "@/lib/toastNotifications";
import { Dispatch, SetStateAction } from "react";

export const useAdminUsers = () => {
    return useQuery({
        queryKey: [AdminUserKeys.all],
        queryFn: listUsers,
        staleTime: 10 * 60 * 1000,
        gcTime: 10 * 60 * 1000
    });
};

export const useCreateUser = (setOpen:Dispatch<SetStateAction<boolean>>) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (values: AddUserFormValues) => createUser(values),
        onSuccess: () => {
            successToast("User created successfully!");
            setOpen(false)
            queryClient.invalidateQueries({
                queryKey: [AdminUserKeys.all],
            });
        },
        onError: (error: any) => {
            errorToast(error?.message || "Failed to create new user.");
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userId: string) => deleteUser(userId),
        onSuccess: () => {
            successToast("User deleted successfully!");
            queryClient.invalidateQueries({
                queryKey: [AdminUserKeys.all],
            });
        },
        onError: (error: any) => {
            errorToast(error?.message || "Failed to delete user.");
        },
    });
};

export const useChangeUserRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            userId,
            role,
        }: {
            userId: string;
            role: Roles;
        }) => changeUserRole({ userId, role }),
        onSuccess: () => {
            successToast("User role has been changed successfully!");
            queryClient.invalidateQueries({
                queryKey: [AdminUserKeys.all],
            });
        },
        onError: (error: any) => {
            errorToast(error?.message || "Failed to change user role.");
        },
    });
};
