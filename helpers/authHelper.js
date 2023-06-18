import bcrypt from "bcrypt";

// function to create hash Password
export const hashPassword = (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

//function to verify password
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// const result = await comparePassword(
//   "haider12345",
//   "$2b$10$odgbiwbjfBlxH3Okk4Qr2eIAH7HwmzlgcgoDmCGOQngBpJu0SPL7a"
// );

// console.log(result);
