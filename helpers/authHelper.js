import bcrypt from "bcrypt";

// function to create hash Password
export const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt(password, saltRounds);
  return hashedPassword;
};

// function to verify password
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
