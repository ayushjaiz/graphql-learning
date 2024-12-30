import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema({
    desciption: {
        type: String,
        required: true,
    }
    author: {
        type: mongoose.Types.ObjectId,
        required: true,
    }
})

const Quote = mongoose.model('Quote', QuotesSchema);
export default Quote;