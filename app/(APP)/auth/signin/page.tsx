import { SigninLeftSideImage, Signinform } from "@/components/sections/auth";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Sign In",
    robots: { index: false, follow: false }
}

const SignUp = () => {


    return (
        <div className="min-h-screen flex">
            {/* Left Side - Image */}
            <SigninLeftSideImage />

            {/* Right Side - Form */}
            <Signinform />

        </div>
    );
};

export default SignUp;
