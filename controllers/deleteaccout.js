import User from "../models/userModel.js";

export async function deleteaccout(req, res) {
    const { email } = req.body;
    try {
        const deletedUser = await User.deleteOne({ email });
        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "User account deleted successfully"
        })

    } catch (error) {
        console.log(error);

    }
}