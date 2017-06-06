/**
 * GET /
 * Home page.
 */
var MobileDetect = require('mobile-detect');
exports.index = (req, res) => {
  mobileInfo = new MobileDetect(req.headers['user-agent']);
  templateName = mobileInfo.mobile()?"mobile_home":"home"
  res.render(templateName, {
    title: 'Home'
  });
};
