import { authOptions, CustomSession } from "../../api/auth/[...nextauth]/options";
import { getUserCoins, getUserOldSummaries } from "@/actions/fetchActions";
import OldSummaryCard from "@/Components/OldSummaryCard";
import UrlInput from "@/Components/UrlInput";
import Header from "@/Components/Header";
import { getServerSession } from "next-auth";

const Dashboard = async () => {

    const session: CustomSession | null = await getServerSession(authOptions);

    const oldSummaries = await getUserOldSummaries(Number(session?.user?.id!));

    const userCoins = await getUserCoins(session?.user?.id!);

    return (
        <div className="container">
            <Header
                user={session?.user!}
                userCoins={userCoins}
            />

            <UrlInput user={session?.user!} />

            <div className="mt-10 px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {oldSummaries.length > 0 && oldSummaries.map((item, index) => (
                        <OldSummaryCard key={index} summary={item} />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Dashboard;