import { Button } from "@/Components/ui/button";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
    return (
        <div className="h-[90vh] flex justify-center items-center flex-col">
            <Image
                src="/assets/404.svg"
                width={500}
                height={500}
                alt="404"
            />

            <Link href="/">
                <Button>
                    Back To Home
                </Button>
            </Link>
        </div>
    )
};

export default NotFound;