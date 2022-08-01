import mongoose from 'mongoose';
import { UserDocument } from './user.model';
import { findOneUser } from '../service/user.service';

/**
 * Notification Document
 */
export interface NotificationDocument extends mongoose.Document {
    title?: string;
    message: string;
    user_id: UserDocument["_id"];
    send_to_email: boolean;
}

/**
 * Notification Schema
*/

const NotificationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: false,
        },
        message: {
            type: String,
            required: true,
        },
        user_id: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "User"
        },
        send_to_email: { type: Boolean, default: false },
    },
    {
        timestamps: true
    }
)


NotificationSchema.pre("save", async function (next: mongoose.HookNextFunction) {
    const notification = this as NotificationDocument
    const user = await findOneUser({ _id: notification.user_id })

    // Function to send email on notification creations
    if (notification.send_to_email) {
        // await sendEmail({
        //     email: `${user?.email}`,
        //     subject: `${notification.title}`,
        //     payload: {
        //         title: `${notification.title}`,
        //         name: `${user?.firstname} ${user?.lastname}`,
        //         content: notification.message,
        //         passwordReset: true
        //     }, template: "./template/email.template.handlebars"
        // });
    }
})

/**
 * Notification Model
*/

export const Notification = mongoose.model<NotificationDocument>("Notification", NotificationSchema)