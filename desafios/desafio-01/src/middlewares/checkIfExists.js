const repository = require("../repository/project");

function checkIfExists(req, res, next) {
  const { id } = req.params;

  if (id) {
    if (repository.exists(id)) {
      next();
    } else {
      return res.json({ error: true, msg: "Invalid ID" });
    }
  } else {
    return res.json({ error: true, msg: "ID is Required" });
  }
}

module.exports = checkIfExists;
