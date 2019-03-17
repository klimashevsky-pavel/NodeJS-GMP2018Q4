import { Schema, model } from 'mongoose';
import { timestampsProps } from 'models/mongo/helpers/timestampsProps';

const cityModelName = 'city';

const citySchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        capital: {
            type: Boolean,
            required: true
        },
        location: {
            lat: {
                type: Number
            },
            long: {
                type: Number
            }
        },
        ...timestampsProps
    },
    { timestamps: true }
);

const cityModel = model(cityModelName, citySchema);

export default cityModel;
