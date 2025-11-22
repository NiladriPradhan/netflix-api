import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// export async function login(req, res) {
//     const { email, password } = req.body;
//     try {
//         if (!email || !password) {
//             return res.json({
//                 message: "Form field required"
//             })
//         }
//         const user = await User.findOne({ email });
//         if (!user || user.length === 0) {
//             return res.status(400).json({
//                 message: "User not found"
//             })
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ success: false, message: "Incorrect password" });
//         }

//         // const mathcPassword = await User.findOne({ password });
//         // if (!mathcPassword) {
//         //     return res.status(400).json({
//         //         message: "password not matched"
//         //     })
//         // }
//         const tokenData = {
//             id: user?._id
//         }
//         const token = await jwt.sign(tokenData, "sdWEfeRcfDFQWedfhWDF", { expiresIn: "1d" });
//         res
//             .status(200)
//             .cookie("token", token, {
//                 httpOnly: true,
//                 secure: true, // set false if testing locally
//                 sameSite: "strict"
//             })
//             .json({
//                 message: `Welcome back, ${user.username}`,
//                 success: true,
//                 user: { username: user.username, email: user.email, id: user._id }
//             });
//     } catch (error) {
//         res.status(500).json({
//             message: "failed user login "
//         })
//     }

// }

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Form fields required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user._id },
      "sdWEfeRcfDFQWedfhWDF",
      { expiresIn: "1h" }
    );

    // IMPORTANT — ONLY ONE RESPONSE
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // change to true in production HTTPS
        sameSite: "lax",
      })
      .json({
        success: true,
        message: `Welcome back, ${user.username}`,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Login failed" });
  }
}
