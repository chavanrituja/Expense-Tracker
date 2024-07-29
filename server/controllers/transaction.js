import Transaction from '../models/Transaction.js';
import User from '../models/User.js';

const postTransaction = async (req, res) => {
    const { title, amount, category, type, user } = req.body;

    const transaction = new Transaction ({
        title,
        amount,
        category,
        type,
        user,
    });

    try {
        const savedTransaction = await transaction.save();

        res.json({
            success: true,
            message: `Transaction successful`,
            data: savedTransaction
        })
    }
    catch (e) {
        res.json({
            success: false,
            message: e.message,
            data: null
        })
    }
}

const getTransaction = async (req, res) => {
    const { userId } = req.query;

    const user = await User.findById (userId);

    if(!user) {
        return res.json({
            success: false,
            message: `User not found`,
            data: null
        })
    }

    const transaction = await Transaction.find({ user: userId })

    res.json({
        success: true,
        message: `Transaction fetched successfully`,
        data: transaction
    })
}

export { postTransaction, getTransaction }
