import { Schema, model } from 'mongoose';
import { timestampsProps } from 'models/mongo/helpers/timestampsProps';

const userModelName = 'user';

const userSchema = new Schema(
    {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        email: {
            type: String
        },
        products: {
            type: Array
        },
        ...timestampsProps
    },
    { timestamps: true }
);

const userModel = model(userModelName, userSchema);

export default userModel;
