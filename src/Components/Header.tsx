"use client";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import ProfileDropdown from "./ProfileDropdown";
import Image from "next/image";
import Link from "next/link";

const Header = ({
    user,
    userCoins
}: {
    user: CustomUser;
    userCoins: CoinsType | null;
}) => {
    return (
        <div className="w-full flex justify-between items-center h-20 py-4 px-6">
            <Link href="/">
                <div className="flex items-center space-x-2">
                    <Image
                        src="/assets/icon_192.png"
                        width={40}
                        height={40}
                        alt="logo"
                    />
                    <h1 className="text-2xl font-extrabold">
                        PodBite
                    </h1>
                </div>
            </Link>

            <div className="flex items-center space-x-4">
                <div className="flex space-x-2 items-center">
                    <span className="text-xl font-bold">
                        {userCoins?.coins ?? 0}
                    </span>

                    <Image
                        src="/assets/coin.png"
                        width={30}
                        height={30}
                        alt="coin"
                    />
                </div>

                <ProfileDropdown user={user} />
            </div>
        </div>
    )
};

export default Header;