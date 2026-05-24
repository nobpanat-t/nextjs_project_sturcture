import Footer from "@/features/auth/presentation/Footer";
import LoginForm from "@/features/auth/presentation/LoginForm";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Login",
    description: "Login page",
};

export default function Page() {
    return (
        <div
            className="relative m-auto max-w-5xl h-lvh w-full p-2"
        >
            <LoginForm />
            <Footer />
        </div>
    )
}