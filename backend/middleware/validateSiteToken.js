const validateSiteToken = (req, res, next) => {
  if (req.headers?.authorization === process.env.SITE_TOKEN) {
    next();
  } else {
    res
      .status(400)
      .json({ success: false, error: "Invalid / Missing Auth Token" });
  }
};

module.exports = validateSiteToken;
