import { Signupform, SignupRightSideImage } from "@/components/sections/auth";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Sign Up",
    robots: { index: false, follow: false }
}

const SignUp = () => {


    return (
        <div className="min-h-screen flex">
            {/* Left Side - Form */}
            <Signupform />

            {/* Right Side - Image */}
            <SignupRightSideImage />
        </div>
    );
};

export default SignUp;
