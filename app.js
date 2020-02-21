'use strict';

function myApp(req, res) {
  res.status(200).send(
      `Ez itt egy weboldal. A link: ${req.url}`,
  );
}

module.exports = myApp;
