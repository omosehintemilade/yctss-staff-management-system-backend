const isRequired = (key) => {
  throw new Error(`${String(key)} parameter is required`);
};

const generateRandomCode = (length = 5) => {
  // Default length is 5 Characters;
  let code = "";
  const chars = "7215369480";
  for (let i = length; i > 0; --i) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
};

module.exports = { isRequired, generateRandomCode };
