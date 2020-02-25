let projects = [];

const ProjectsRepository = {
  list: () => {
    return projects;
  },
  add: project => {
    projects.push(project);
  },
  delete: id => {
    let index = projects.findIndex((v, _i) => v.id == id);
    projects.splice(index, 1);
  },
  addTask: (id, title) => {
    let index = projects.findIndex((v, _i) => v.id == id);
    if (index != -1) {
      projects[index].tasks.push(title);
    }
  },
  edit: (id, title) => {
    let index = projects.findIndex((v, _i) => v.id == id);
    if (index != -1) {
      projects[index].title = title;
    }
  },
  exists: id => {
    return projects.findIndex((v, _i) => v.id == id) != -1;
  }
};

module.exports = ProjectsRepository;
