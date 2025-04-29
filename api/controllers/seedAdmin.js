// import User from "../models/user.model.js";
// import bcrypt from "bcryptjs";

// export const seedAdmin = async (req, res) => {
//   try {
//     const adminEmail = process.env.ADMIN_EMAIL;
//     const adminPassword = process.env.ADMIN_PASSWORD;

//     const existingAdmin = await User.findOne({ email: adminEmail });
//     if (existingAdmin) {
//       console.log("Admin account already exists.");
//       return;
//     }

//     const hashedPassword = bcrypt.hashSync(adminPassword, 10);
//     const adminUser = new User({
//       username: "admin",
//       email: adminEmail,
//       password: hashedPassword,
//       role: "admin",
//     });
//     await adminUser.save();
//     console.log("admin account created successfully.");
//   } catch (error) {
//     console.error("Error seeding admin account:", error);
//   }
// };
