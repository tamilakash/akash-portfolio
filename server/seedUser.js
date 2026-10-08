import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';

dotenv.config();

const seedAdminUser = async () => {
  await connectDB();

  const email = 'tamilakashakash52@gmail.com';
  const password = 'admin123';

  let user = await User.findOne({ email });
  if (user) {
    user.password = password;
    await user.save();
    console.log(`✅ Default admin user updated:`);
  } else {
    user = await User.create({
      name: 'T. Akash',
      email,
      password,
      role: 'admin'
    });
    console.log(`✅ Default admin user created:`);
  }

  console.log(`-----------------------------------`);
  console.log(`Email ID : ${email}`);
  console.log(`Password : ${password}`);
  console.log(`-----------------------------------`);
  process.exit(0);
};

seedAdminUser();
