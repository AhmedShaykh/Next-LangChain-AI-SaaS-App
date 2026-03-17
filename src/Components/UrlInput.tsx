"use client";
import { FormEvent, useState } from "react";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { clearCache } from "@/actions/commonActions";
import Loading from "@/Components/Loading";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const UrlInput = ({ user }: { user: CustomUser }) => {

    const [errors, setErrors] = useState<AddUrlErrorType>({});

    const [loading, setLoading] = useState(false);

    const [url, setUrl] = useState("");

    const router = useRouter();

    const handleSubmit = async (event: FormEvent) => {

        try {

            event.preventDefault();

            setLoading(true);

            const { data } = await axios.post("/api/add-url", {
                url: url,
                user_id: user.id
            });

            const newChat: ChatType = data?.data;

            if (newChat) {

                toast.success("Url is correct redirecting you to the summarize window");

                clearCache("oldSummaries");

                router.push(`/summarize/?id=${newChat.id}`);

            }

        } catch (error) {

            setLoading(false);

            if (error instanceof AxiosError) {

                if (error.response?.status === 422) {

                    setErrors(error.response?.data?.errors);

                } else {

                    toast.error(error.response?.data?.message);

                }

            }

        }

    };

    return (
        <div className="flex justify-center items-center mt-10 w-full">
            <form
                className="relative w-full md:w-[500px]"
                onSubmit={handleSubmit}
            >
                <input
                    className="h-12 rounded-lg bg-muted border border-pink-400 border-dashed p-2 w-full md:w-[500px]  outline-none"
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter your Podcast URL"
                    disabled={loading}
                    value={url}
                    type="text"
                />

                {loading && (
                    <div className="absolute right-2 top-2.5">
                        <Loading />
                    </div>
                )}
            </form>

            <span className="text-red-500">
                {errors?.url}
            </span>
        </div>
    )
};

export default UrlInput;