const { Router } = require("express");

const repository = require("./repository/project");

const checkIfExists = require("./middlewares/checkIfExists");

const routes = new Router();

routes.get("/projects", (_req, res) => {
  return res.json(repository.list());
});
routes.post("/projects", (req, res) => {
  const { id, title } = req.body;

  repository.add({ id: id, title: title, tasks: [] });

  return res.json(repository.list());
});
routes.post("/projects/:id/tasks", checkIfExists, (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  repository.addTask(id, title);

  return res.json(repository.list());
});
routes.put("/projects/:id", checkIfExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  repository.edit(id, title);

  return res.json(repository.list());
});
routes.delete("/projects/:id", checkIfExists, (req, res) => {
  const { id } = req.params;

  repository.delete(id);

  return res.json(repository.list());
});

module.exports = routes;
