import { authOptions, CustomSession } from "@/app/api/auth/[...nextauth]/options";
import { getTransactions, getUserCoins } from "@/actions/fetchActions";
import { TreeDataItem, TreeView } from "@/Components/ui/tree-view";
import Header from "@/Components/Header";
import { getServerSession } from "next-auth";

interface Transaction {
    id: string;
    status: number;
    amount: number;
    [key: string]: any;
};

const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

const Transactions = async () => {

    const session: CustomSession | null = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return (
            <div className="text-center mt-10 text-red-500 font-semibold">
                Unauthorized Access
            </div>
        );
    }

    const userId = session.user.id;

    const userCoins = await getUserCoins(userId);

    const transactions: Transaction[] = await getTransactions(userId);

    const data: TreeDataItem[] = transactions.map(({ id, ...rest }) => ({
        id,
        name: `Transaction ${id}`,
        children: Object.entries(rest).map(([key, value]) => ({
            id: `${id}-${key}`,
            name:
                key === "status"
                    ? `Status: ${value === 1 ? "Success ✅" : "Declined ❌"}`
                    : `${capitalize(key)}: ${value}`
        }))
    }));

    return (
        <div className="container px-6">
            <Header user={session.user} userCoins={userCoins} />

            <div className="text-center w-full">
                <h1 className="text-2xl font-bold mb-4">
                    Transactions History
                </h1>

                <div className="flex justify-center items-center w-full">
                    <div className="w-full md:w-[500px]">
                        {transactions.length > 0 ? (
                            <TreeView data={data} />
                        ) : (
                            <p className="text-gray-500">No Transactions Found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transactions;