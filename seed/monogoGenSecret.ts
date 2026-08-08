import mongoose from "mongoose";
import User from "../backend/models/User";
import { generateSecret, verify } from "otplib"
import 'dotenv/config'


async function genSecret() {

    console.log(process.env.MONGODB_URI)
    await mongoose.connect(process.env.MONGODB_URI!).then((mongooseInstance) => {
        return mongooseInstance;
    })

    const users = await User.find({}) as Record<string, unknown>[]
    console.log(users)
    for (const user of users) {
        const secret = generateSecret()
        console.log(user)
        console.log(secret)
        await User.findByIdAndUpdate(user._id, { secret: secret })
        console.log(`SUCCESS\n\n\n\n: ${user._id}`)
    }
}
genSecret()