"use client";
import { useEffect } from "react";
import { Button } from "@/Components/ui/button";
import Image from "next/image";

const Error = ({
    error,
    reset
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) => {

    useEffect(() => {

        console.log(error);

    }, [error]);

    return (
        <div className="h-[90vh] flex justify-center items-center flex-col">
            <Image
                src="/assets/500.svg"
                width={500}
                height={500}
                alt="404"
            />
            <h2>
                Something Went Wrong!
            </h2>

            <Button onClick={() => reset()}>
                Try again
            </Button>
        </div>
    )
};

export default Error;