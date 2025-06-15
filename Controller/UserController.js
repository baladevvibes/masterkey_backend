const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { decrypt, encrypt } = require("../Utils/EncryptDecrypt");
exports.RegisterController = async (req, res) => {
  console.log(req.body);

  try {
    const { username, email, password, role } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        status: false,
        message: "Email Already registered",
      });
    }
    const hashingPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      role,
      password: hashingPassword,
    });
    await newUser.save();
    return res.status(201).json({
      status: true,
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.LoginController = async (req, res) => {
  let deDatd = JSON.parse(decrypt(req.body.data));
  console.log(deDatd);
  try {
    const { email, password } = deDatd;
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("Invalid credentials");
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid credentials");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = {
      id: user._id,
      role: user.role,
      name: user.username,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "1d", // Token expires in 1 day
    });

    const enData = encrypt(JSON.stringify(payload));
    res.status(200).json({
      message: "Login successful",
      token: token,
      enData: enData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// exports.LogoutController = async (req, res) => {
//   try {
//     res.clearCookie("authtoken");
//     return res.status(200).json({
//       status: true,
//       message: "Logout Sucessfully",
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: false,
//       message: "Something went Worng",
//       error: error.message,
//     });
//   }
// };
