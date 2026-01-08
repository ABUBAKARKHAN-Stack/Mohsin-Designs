import {
    ResetPasswordFallback,
    ResetPasswordForm,
    ResetPasswordLeftSideImage
} from "@/components/sections/auth";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Reset Password",
    robots: { index: false, follow: false }
}

interface Props {
    searchParams: Promise<{ token: string | undefined }>;
}

const ResetPasswordPage = async (
    {
        searchParams
    }: Props
) => {

    const { token } = await searchParams

    // Fallback 
    if (!token) return <ResetPasswordFallback />


    return (
        <div className="min-h-screen flex">

            {/* Left Side - Image */}
            <ResetPasswordLeftSideImage />

            {/* Right Side - Form */}
            <ResetPasswordForm token={token} />

        </div>
    );
};

export default ResetPasswordPage;
