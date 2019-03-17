import { Document } from 'mongoose';

interface ProductDocument extends Document {
    name: string;
    reviews: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export { ProductDocument };
