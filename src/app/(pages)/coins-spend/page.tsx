import { authOptions, CustomSession } from "@/app/api/auth/[...nextauth]/options";
import { getCoinsSpend, getUserCoins } from "@/actions/fetchActions";
import { TreeDataItem, TreeView } from "@/Components/ui/tree-view";
import Header from "@/Components/Header";
import { getServerSession } from "next-auth";
import Link from "next/link";

const CoinsSpend = async () => {

    const session: CustomSession | null = await getServerSession(authOptions);

    const userCoins = await getUserCoins(session?.user?.id!);

    const coinsSpends = await getCoinsSpend(session?.user?.id!);

    const data: TreeDataItem[] = [
        {
            id: "1",
            name: "Item 1",
            children: [
                {
                    id: "2",
                    name: "Item 1.1",
                    children: [
                        {
                            id: "3",
                            name: "Item 1.1.1",
                        },
                        {
                            id: "4",
                            name: "Item 1.1.2",
                        },
                    ],
                },
                {
                    id: "5",
                    name: "Item 1.2 (disabled)",
                    disabled: true
                },
            ],
        },
        {
            id: "6",
            name: "Item 2 (draggable)",
            draggable: true
        }
    ];

    return (
        <div className="container px-6">
            <Header user={session?.user!} userCoins={userCoins} />

            <div className="text-center w-full">
                <h1 className="text-2xl font-bold mb-4">
                    Coins Spend History
                </h1>

                <div className="flex justify-center items-center space-y-6 flex-col">
                    {coinsSpends && coinsSpends.length > 0 && coinsSpends.map((item, index) => (
                        <div
                            className="w-full text-left md:w-[500px] rounded-md p-4 border border-dashed"
                            key={index}
                        >
                            <Link href={`/summarize?id=${item.summary_id}`}>
                                <h1 className="font-bold my-2">
                                    {item.summary?.title}
                                </h1>
                            </Link>

                            <p className="my-2">
                                <strong>URL</strong> {item.summary.url}
                            </p>

                            <p>Created At :- {new Date(item.created_at).toDateString()}</p>
                        </div>
                    ))}

                    <TreeView data={data} />
                </div>
            </div>
        </div>
    )
};

export default CoinsSpend;