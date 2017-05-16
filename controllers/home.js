/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};

exports.postSearch = (req, res) => {
  const options = {
    numPeople: req.body.NoOfPeople,
    roomType: req.body.roomType
  }

  res.options = options;
  res.redirect('/search');
};
