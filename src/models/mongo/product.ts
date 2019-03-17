import { Schema, model } from 'mongoose';
import { timestampsProps } from 'models/mongo/helpers/timestampsProps';

const productModelName = 'product';

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        reviews: {
            type: Array
        },
        ...timestampsProps
    },
    { timestamps: true }
);

const productModel = model(productModelName, productSchema);

export default productModel;
