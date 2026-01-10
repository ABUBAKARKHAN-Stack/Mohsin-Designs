"use client"

import { Session } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { errorToast, successToast } from "@/lib/toastNotifications";
import { AddUserFormValues } from "@/schemas/auth.schema";
import { ErrorStates, LoadingStates, Permissions, Roles } from "@/types/auth.types";
import { UserWithRole } from "better-auth/plugins";
import { useRouter } from "next/navigation";
import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction, useEffect } from "react";

interface SessionContextType {
    session: Session;
    createUser: (value: AddUserFormValues, setOpen: Dispatch<SetStateAction<boolean>>) => Promise<void>;
    getAllUsers: (searchValue?: string) => Promise<void>;
    deleteUser: (userId: string) => Promise<void>;
    changeUserRole: (userId: string, role: Roles) => Promise<void>;
    users: UserWithRole[];
    logout: () => Promise<void>;
    loading: LoadingStates;
    error: ErrorStates;

}
const SessionContext = createContext<SessionContextType | undefined>(undefined);


export function SessionProvider({
    children,
    session
}: { children: ReactNode, session: Session }) {

    const [loading, setLoading] = useState<LoadingStates>("idle")
    const [error, setError] = useState<ErrorStates>("idle")
    const [users, setUsers] = useState<UserWithRole[]>([])
    const router = useRouter()


    const logout = async () => {
        await authClient.signOut(
            {},
            {
                onRequest(_context) {
                    setLoading("logout")
                },
                onSuccess(_context) {
                    successToast("Logout Successful!")
                    router.push("/auth/signin")
                },
                onError(context) {
                    const errMsg = context.error.message || "Failed To Logout. Try Again"
                    errorToast(errMsg)
                },
                onResponse(_context) {
                    setLoading("idle")
                },
            }
        )
    }

    const createUser = async (values: AddUserFormValues, setOpen: Dispatch<SetStateAction<boolean>>) => {
        const permissions = rolePermissions[values.role]
        await authClient.admin.createUser({
            email: values.email,
            name: values.fullName,
            password: values.password,

            role: values.role as any,
            data: { permissions, emailVerified: true }
        }, {
            onRequest(_context) {
                setLoading("add_user")
            },
            onSuccess(_context) {
                successToast("User created successfully!");
                setOpen(false)
            },
            onError(context) {
                const errMsg = context.error.message || "Failed to create new user."
                errorToast(errMsg)
            },
            onResponse(_context) {
                setLoading("idle")
            },
        })
    }

    const getAllUsers = async (searchValue?: string) => {
        const { data, error: _ } = await authClient.admin.listUsers(
            {
                query: {
                    searchValue,
                    searchField: "name",
                    searchOperator: "contains",
                    sortBy: "name",
                    sortDirection: "desc",
                },
            },
            {
                onRequest(_context) {
                    setLoading("list_users")
                },
                onError(_context) {
                    setError("list_user")
                },
                onResponse(_context) {
                    setLoading("idle")
                },
            }
        );

        if (data) {
            setUsers(data.users)
            return;
        }
        setUsers([])
    }

    useEffect(() => {
        ; (async () => {
            await getAllUsers()
        })()
    }, [])

    const deleteUser = async (userId: string) => {
        await authClient.admin.removeUser(
            { userId },
            {
                onRequest(_context) {
                    setLoading("delete_user")
                },
                async onSuccess(_context) {
                    successToast("User deleted successfully!");
                    await getAllUsers()
                },
                onError(context) {
                    const errMsg = context.error.message || "Failed to delete user."
                    errorToast(errMsg)
                },
                onResponse(_context) {
                    setLoading("idle")
                },
            }

        )
    }

    const changeUserRole = async (userId: string, role: Roles) => {
        await authClient.admin.setRole(
            {
                userId,
                role: role as any
            },
            {
                onRequest(_context) {
                    setLoading("change_role")
                },
                async onSuccess(_context) {
                    successToast("User role has been changed successfully!");
                    await getAllUsers()
                },
                onError(context) {
                    const errMsg = context.error.message || "Failed to change user role."
                    errorToast(errMsg)
                },
                onResponse(_context) {
                    setLoading("idle")
                },
            }

        )
    }


    return (
        <SessionContext.Provider value={{

            session,
            createUser,
            users,
            getAllUsers,
            changeUserRole,
            deleteUser,
            loading,
            logout,
            error
        }}>
            {children}
        </SessionContext.Provider>
    );
}

export function useSession() {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}




export const rolePermissions: Record<Roles, Permissions> = {
    admin: {
        users: { manage: true, read: true, write: true },
        seo: { manage: true, read: true, write: true },
        content: { manage: true, read: true, write: true },
    },
    seo_manager: {
        users: { manage: false, read: true, write: false },
        seo: { manage: true, read: true, write: true },
        content: { manage: false, read: true, write: false },
    },
    seo_executive: {
        users: { manage: false, read: false, write: false },
        seo: { manage: false, read: true, write: true },
        content: { manage: false, read: true, write: false },
    },
    content_writer: {
        users: { manage: false, read: false, write: false },
        seo: { manage: false, read: true, write: false },
        content: { manage: false, read: true, write: true },
    },
    user: {
        users: { manage: false, read: false, write: false },
        seo: { manage: false, read: false, write: false },
        content: { manage: false, read: true, write: false },
    },
};

export function usePermissions(): Permissions {
    const { session } = useSession();
    if (!session) return rolePermissions.user;
    return rolePermissions[session.user.role as Roles];
}

export const roleLabels: Record<Roles, string> = {
    admin: "Admin",
    seo_manager: "SEO Manager",
    seo_executive: "SEO Executive",
    content_writer: "Content Writer",
    user: "Viewer",
};

export const roleDescriptions: Record<Roles, string> = {
    admin: "Full control over all features",
    seo_manager: "All SEO fields access",
    seo_executive: "Meta Title & Description only",
    content_writer: "Content editing, draft only",
    user: "View-only access",
};