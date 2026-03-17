export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/dashboard",
        "/summarize",
        "/transactions",
        "/coins-spend",
        "/dashboard",
        "/summarize",
        "/payment/success",
        "/payment/cancel"
    ]
};