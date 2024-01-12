import express from "express";
import { assignments } from "./data/assignments.js";
import { comments } from "./data/comments.js";

let assignmentsMockData = assignments;

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/assignments", (req, res) => {
  let limit = Number(req.query.limit);

  if (limit > 10) {
    return res.status(401).json({
      message: "Invalid request,limit must not exceeds 10 assignments",
    });
  }

  const assignmentsWithLimit = assignmentsMockData.slice(0, limit);

  return res.json({
    data: assignmentsWithLimit,
  });
});

app.get("/assignments/:assignmentId", (req, res) => {
  let assignmentIdFromClient = Number(req.params.assignmentId);
  let assignmentsData = assignmentsMockData.filter(
    (item) => item.id === assignmentIdFromClient
  );

  return res.json({
    data: assignmentsData[0],
  });
});

app.post("/assignments", (req, res) => {
  assignmentsMockData.push({
    id: assignmentsMockData[assignmentsMockData.length - 1].id + 1,
    ...req.body,
  });

  return res.json({
    message: "New assignment has been created successfully",
    data: assignmentsMockData[assignmentsMockData.length - 1],
  });
});

app.delete("/assignments/:assignmentsId", (req, res) => {
  let assignmentIdFromClient = Number(req.params.assignmentsId);
  let assignmentData = assignmentsMockData.filter(
    (item) => item.id !== assignmentIdFromClient
  );

  if (assignmentData == false) {
    return res.status(204).json({
      message: "Cannot delete, No data available!",
    });
  }

  assignmentsMockData = assignmentData;

  return res.json({
    message: `Assignment Id : ${req.params.assignmentsId} has been deleted successfully`,
  });
});

app.put("/assignments/:assignmentsId", (req, res) => {
  const assignmentIdFromClient = Number(req.params.assignmentsId);
  const updatedAssignment = req.body;

  const assignmentIndex = assignmentsMockData.findIndex(
    (assignment) => assignment.id === assignmentIdFromClient
  );

  assignmentsMockData[assignmentIndex] = {
    ...assignmentsMockData[assignmentIndex],
    ...updatedAssignment,
  };

  return res.json({
    message: `Assignment Id : ${assignmentIdFromClient} has been updated successfully`,
    data: assignmentsMockData[assignmentIndex],
  });
});

app.listen(port, () => {
  console.log(`Starting server on port ${port}`);
});
