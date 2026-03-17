"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/Components/ui/alert-dialog";
import { signOut } from "next-auth/react";

const LogoutModal = ({
    open,
    setOpen
}: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}) => {

    const logout = () => {
        signOut({
            callbackUrl: "/",
            redirect: true
        });
    };

    return (
        <AlertDialog
            onOpenChange={setOpen}
            open={open}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This action will delete your current session and you can't accessprivate routes
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction onClick={logout}>
                        Log Out
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
};

export default LogoutModal;