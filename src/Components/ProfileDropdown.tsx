"use client";
import React, { Suspense, useState } from "react";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import LogoutModal from "./LogoutModal";
import UserAvatar from "./UserAvatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/Components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

const ProfileDropdown = ({ user }: { user: CustomUser | null }) => {

    const [open, setOpen] = useState(false);

    const router = useRouter();

    return (
        <>
            {open && (
                <Suspense fallback={<p>Loading...</p>}>
                    <LogoutModal open={open} setOpen={setOpen} />
                </Suspense>
            )}

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <UserAvatar
                        image={user?.image ?? ""}
                        name={user?.name!}
                    />
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        My Account
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => router.push("/transactions")}>
                        Transactions
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => router.push("/coins-spend")}>
                        Coins Spend
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
};

export default ProfileDropdown;