import { addCoins, clearCache } from "@/actions/commonActions";
import { getCoinsFromAmount } from "@/lib/utils";
import notFound from "@/app/not-found";
import prisma from "@/lib/db.config";
import Image from "next/image";

const SuccessTransactions = async ({
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
            status: 1
        },
        where: {
            id: searchParams["txnId"]
        }
    });

    await addCoins(transaction.user_id, getCoinsFromAmount(transaction.amount));

    clearCache("userCoins");

    clearCache("transactions");

    return (
        <div className="h-screen flex justify-center items-center flex-col">
            <Image
                src="/assets/check.png"
                height={512}
                width={512}
                alt="success"
            />

            <h1 className="text-3xl font-bold text-green-400">
                Payment Processed successfully!
            </h1>
        </div>
    )
};

export default SuccessTransactions;