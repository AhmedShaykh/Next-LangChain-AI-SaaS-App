"use client";
import Link from "next/link";

const OldSummaryCard = ({
    summary
}: {
    summary: UserSummaries;
}) => {
    return (
        <div className="bg-white shadow-md rounded-md p-4 h-52">
            <h1 className="text-lg font-bold">
                {summary.title}
            </h1>

            <Link href={`/summarize?id=${summary.id}`}>
                <h1 className="font-semibold mt-2">
                    {summary.url}
                </h1>
            </Link>

            <p className="mt-2">
                Created At :- {new Date(summary.created_at).toDateString()}
            </p>
        </div>
    )
};

export default OldSummaryCard;