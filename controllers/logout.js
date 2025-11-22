export async function logout(req, res) {
    return res
        .status(200)
        .cookie("token", "", {
            httpOnly: true,       // prevents access from JS
            secure: false,         // only over HTTPS (set false for local dev)
            sameSite: "strict",   // optional, CSRF protection
            expires: new Date(0), // set cookie expiry in the past to delete
        })
        .json({
            message: "Logout successful",
            success: true
        });
}
