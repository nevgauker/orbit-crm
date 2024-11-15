import { SignInForm } from "@/components/forms/sign_in_form";

function SignInPage() {
    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h1>
                <SignInForm />
            </div>
        </div>
    )
}

export default SignInPage