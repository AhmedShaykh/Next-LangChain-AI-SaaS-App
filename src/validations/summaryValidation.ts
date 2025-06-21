import { CustomErrorReporter } from "./CustomErrorReporter";
import vine from "@vinejs/vine";

vine.errorReporter = () => new CustomErrorReporter();

export const summarySchema = vine.object({
    url: vine.string().url(),
    user_id: vine.string()
});