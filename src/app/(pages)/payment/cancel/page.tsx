import { clearCache } from "@/actions/commonActions";
import notFound from "@/app/not-found";
import prisma from "@/lib/db";
import Image from "next/image";

const CancelTransactions = async ({
    searchParams
}: {
    searchParams: { [key: string]: string | undefined };
}) => {

    const transaction = await prisma.transactions.findUnique({
        where: {
            status: 2,
            id: searchParams["txnId"]
        }
    });

    if (!transaction) {

        return notFound();
    }

    await prisma.transactions.update({
        data: {
            status: 0
        },
        where: {
            id: searchParams["txnId"]
        }
    });

    clearCache("transactions");

    return (
        <div className="h-screen flex justify-center items-center flex-col">
            <Image
                src="/assets/cancel.png"
                height={512}
                width={512}
                alt="cancel"
            />

            <h1 className="text-3xl font-bold text-red-400">
                Payment Canceled by the user
            </h1>
        </div>
    )
};

export default CancelTransactions;