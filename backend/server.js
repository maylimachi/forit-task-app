const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let tasks = [];

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});
app.post("/api/tasks", (req, res) => {
    const { title, description } = req.body;

    // Validación
    if (!title) {
        return res.status(400).json({ error: "El título es obligatorio" });
    }

    const newTask = {
        id: Date.now().toString(),
        title,
        description: description || "",
        completed: false,
        createdAt: new Date(),
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
    });
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  task.title = title ?? task.title;
  task.description = description ?? task.description;
  task.completed = completed ?? task.completed;

  res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;

  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  tasks.splice(index, 1);

  res.json({ message: "Tarea eliminada" });
});

