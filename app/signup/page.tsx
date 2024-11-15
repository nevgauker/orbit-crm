import { SignUpForm } from "@/components/forms/sign_up_form";

function SignUpPage() {
    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Sign Up</h1>
                <SignUpForm />
            </div>
        </div>
    );
}

export default SignUpPage
