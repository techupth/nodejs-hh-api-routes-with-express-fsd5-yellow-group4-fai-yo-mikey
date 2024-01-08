import express from "express";
import { assignments } from "./data/assignments.js";

let assignmentsMockDatabase = [...assignments];

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/assignments", (req, res) => {
  const limit = req.query.limit;
  if (limit > 10) {
    return res.status(401).json({
      message: "Invalid request,limit must not exceeds 10 assignments",
    });
  }
  const assignments = assignmentsMockDatabase.slice(0, limit);
  return res.json({
    message: "Complete Fetching assignments",
    data: assignments,
  });
});

app.get("/assignments/:assignmentsId", function (req, res) {
  let assignmentsIdFromClient = Number(req.params.assignmentsId);
  let assignments = assignmentsMockDatabase.filter((item) => {
    return item.id === assignmentsIdFromClient;
  });

  return res.json({
    message: "Complete Fetching assignments",
    data: assignments[0],
  });
});

app.post("/assignments", function (req, res) {
  assignmentsMockDatabase.push({
    id: assignmentsMockDatabase[assignmentsMockDatabase.length - 1].id + 1,
    ...req.body,
  });

  return res.json({
    message: "New assignment has been created successfully",
    data: assignmentsMockDatabase,
  });
});

app.delete("/assignments/:assignmentsId", (req, res) => {
  const assignmentsIdFromClient = Number(req.params.assignmentsId);
  const newAssignmentsDatabase = assignmentsMockDatabase.filter((item) => {
    return item.id !== assignmentsIdFromClient;
  });

  if (assignmentsIdFromClient !== assignmentsMockDatabase.id) {
    return res.json({
      message: "Cannot delete, No data available!",
    });
  }

  assignmentsMockDatabase = newAssignmentsDatabase;
  return res.json({
    message: `Assignment Id : ${assignmentsIdFromClient}  has been deleted successfully`,
  });
});

app.put("/assignments/:assignmentsId", (req, res) => {
  let assignmentsIdFromClient = Number(req.params.assignmentsId);
  const assignmentsIndex = assignmentsMockDatabase.findIndex((item) => {
    return item.id === assignmentsIdFromClient;
  });

  assignmentsMockDatabase[assignmentsIndex] = {
    id: assignmentsIdFromClient,
    ...req.body,
  };
  return res.json({
    message: `Assignment Id : ${assignmentsIdFromClient}  has been updated successfully`,
    data: assignmentsMockDatabase,
  });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
