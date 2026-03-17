import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "./ui/button";
import LoginModal from "./LoginModal";
import Image from "next/image";
import Link from "next/link";

const Navbar = ({ user }: { user?: CustomUser }) => {
    return (
        <div className="bg-white shadow-sm">
            <div className="container mx-auto flex justify-between items-center p-6">
                <div className="flex items-center space-x-2">
                    <Image
                        src="/assets/icon_192.png"
                        width={40}
                        height={40}
                        alt="logo"
                    />

                    <h1 className="text-3xl font-extrabold">
                        PodBite
                    </h1>
                </div>

                <div className="space-x-4">
                    <Button variant="ghost">
                        Pricing
                    </Button>

                    {user ? (
                        <Link href="/dashboard">
                            <Button>
                                Dashboard
                            </Button>
                        </Link>
                    ) : (
                        <LoginModal />
                    )}
                </div>
            </div>
        </div>
    )
};

export default Navbar;