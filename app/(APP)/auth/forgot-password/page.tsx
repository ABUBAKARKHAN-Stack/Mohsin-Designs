import {
    ForgotPasswordForm,
    ForgotPasswordLeftSideImage
} from "@/components/sections/auth";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Forgot Password",
    robots: { index: false, follow: false }
}

const ForgotPasswordPage = () => {


    return (
        <div className="min-h-screen flex">
            
            {/* Left Side - Image */}
            <ForgotPasswordLeftSideImage />

            {/* Right Side - Form */}
            <ForgotPasswordForm />

        </div>
    );
};

export default ForgotPasswordPage;
