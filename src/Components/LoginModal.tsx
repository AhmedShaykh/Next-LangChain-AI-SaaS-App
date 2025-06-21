"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

const LoginModal = () => {

    const handleGoogleLogin = async () => {
        signIn("google", {
            redirect: true,
            callbackUrl: "/"
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="ml-4">
                    Login / Sign Up
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Login / Sign Up
                    </DialogTitle>
                </DialogHeader>

                <div className="text-center">
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                        PodBite
                    </h1>
                </div>

                <Button variant="outline" onClick={handleGoogleLogin}>
                    <Image
                        src="/assets/google.png"
                        className="mr-4"
                        width={25}
                        height={25}
                        alt="google"
                    />
                    Continue with Google
                </Button>
            </DialogContent>
        </Dialog>
    )
};

export default LoginModal;