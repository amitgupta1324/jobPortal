export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();

  // Adding default fallback for COOKIE_EXPIRE
  const options = {
    expires: new Date(
      Date.now() + (process.env.COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000 // Default to 7 days if undefined
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
