"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "@/Components/ui/button";
import getStripe from "@/lib/stripe";
import { cn } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const Pricing = ({ user }: { user?: CustomUser }) => {

    const [loading, setLoading] = useState(false);

    const initiatePayment = async (plan: string) => {

        if (!user) {

            toast.error("Please Login First.");

        }

        setLoading(true);

        try {

            const { data } = await axios.post("/api/stripe/session", { plan: plan });

            if (data?.id) {

                const stripe = await getStripe();

                await stripe?.redirectToCheckout({ sessionId: data?.id });

            }

            setLoading(false);

        } catch (error) {

            setLoading(false);

            if (error instanceof AxiosError) {

                toast.error(error?.response?.data?.message);

            } else {

                toast.error("Something Went Wrong... Please Try Again!");

            }

        }

    };

    return (
        <div className="py-24">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center ">
                    Simple, Transparent Pricing
                </h2>

                <p className="text-2xl text-indigo-500 font-bold text-center mb-12">
                    1 coin = 1 €
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
                    <Card className={cn("shadow-lg border-2", { "border-pink-600": true })}>
                        <CardHeader>
                            <CardTitle>Starter</CardTitle>

                            <p className="text-sm text-muted-foreground">
                                Perfect For Individuals.
                            </p>
                        </CardHeader>

                        <CardContent>
                            <p className="text-2xl font-bold">100 Coins</p>

                            <ul className="mt-4 space-y-2">
                                <li>10 Podcast Summary</li>
                                <li>Top Questions Highlight</li>
                                <li>AI-Powered Insights</li>
                            </ul>

                            <Button
                                onClick={() => initiatePayment("Starter")}
                                className="mt-4 w-full"
                                disabled={loading}
                            >
                                Buy Coins
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className={cn("shadow-lg border-2", { "border-indigo-600": true })}>
                        <CardHeader>
                            <CardTitle>Pro</CardTitle>

                            <p className="text-sm text-muted-foreground">
                                Best For Professionals.
                            </p>
                        </CardHeader>

                        <CardContent>
                            <p className="text-2xl font-bold">500 Coins</p>

                            <ul className="mt-4 space-y-2">
                                <li>51 Podcast Summaries</li>
                                <li>Top Questions Highlight</li>
                                <li>AI-Powered Insights</li>
                                <li>Priority Support</li>
                                <li>Get One Podcast Summary Free 🚀</li>
                            </ul>

                            <Button
                                onClick={() => initiatePayment("Pro")}
                                className="mt-4 w-full"
                                disabled={loading}
                            >
                                Buy Coins
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className={cn("shadow-lg border-2", { "border-cyan-500": true })}>
                        <CardHeader>
                            <CardTitle>Pro Plus</CardTitle>

                            <p className="text-sm text-muted-foreground">
                                Ideal For Teams.
                            </p>
                        </CardHeader>

                        <CardContent>
                            <p className="text-2xl font-bold">1000 Coins</p>

                            <ul className="mt-4 space-y-2">
                                <li>102 Podcast Summaries</li>
                                <li>Top Questions Highlight</li>
                                <li>AI-Powered Insights</li>
                                <li>Dedicated Support</li>
                                <li>Get two Podcast Summary Free 🚀</li>
                            </ul>

                            <Button
                                onClick={() => initiatePayment("Pro Plus")}
                                className="mt-4 w-full"
                                disabled={loading}
                            >
                                Buy Coins
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
};

export default Pricing;