import express, { json } from "express";
import connectionPool from "./utils/db.mjs";

const app = express();
const port = 4000;

app.use(express.json());

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});
//ดู questions ทั้งหมด
app.get("/questions", async (req, res) => {
  try {
    const result = await connectionPool.query("SELECT * FROM questions");
    return res.status(200).json({ data: result.rows });
  } catch (error) {
    return res.status(500).json({ message: "Unable to fetch questions." });
  }
});
//ดู questions by id
app.get("/questions/:questionsId", async (req, res) => {
  try {
    const id = req.params.questionsId;
    const result = await connectionPool.query(
      `select * from questions where id = $1`,
      [id]
    );
    return res.status(200).json({ data: result.rows[0] });
  } catch (error) {
    return res.status(500).json({ message: "Unable to fetch questions." });
  }
});
//เพิ่ม question ใหม่
app.post("/questions", async (req, res) => {
  const newQuestions = req.body;
  try {
    const result = await connectionPool.query(
      `insert into questions(title, description, category) values($1, $2, $3)`,
      [newQuestions.title, newQuestions.description, newQuestions.category]
    );
    return res.status(201).json({ message: "Question created successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Question created successfully.",
    });
  }
});
//updated question
app.put("/questions/:questionId", async (req, res) => {
  const id = req.params.questionId;
  const updatedQuestions = { ...req.body, updated_at: new Date() };
  try {
    await connectionPool.query(
      `update questions 
      set title = $2,
          description = $3,
          category = $4
      where id = $1
      `,
      [
        id,
        updatedQuestions.title,
        updatedQuestions.description,
        updatedQuestions.category,
      ]
    );
    return res.status(200).json({
      message: "Question updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//delete question
app.delete("/questions/:questionId", async (req, res) => {
  try {
    const id = req.params.questionId;

    await connectionPool.query(
      `delete from questions
      where id = $1`,
      [id]
    );
    return res.status(200).json({
      message: "Question post has been deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to delete answers." });
  }
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
