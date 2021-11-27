const express = require("express");
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 3001;
const app = express();

//get req
app.get("/", (req, res) => {
  res.send("Hello, click here to start!");
});
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});
app.get("api/notes", (req, res) => {
  fs.readFile("./db/db.json", "UTF-8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parseNotes = JSON.parse(data);
      response.JSON(parseNotes);
    }
  });
});

//post req
app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  const createNote = { title, text, id: uniqid() };
  response.JSON(createNote);
});
fs.readFile("./db/db.json", "UTF-8", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    const parseNotes = JSON.parse(data);
    parseNotes.push(createNote);

    fs.writeFile(".db/db.json", JSON.stringify(parseNotes), (writeErr) =>
      writeErr
        ? console.error(writeErr)
        : console.info("Note added sucessfully!")
    );
  }
});

//delete req
app.delete("./api/notes/:id", (req, res) => {
  const deleteById = req.params.id;
  const notId = (i) => i.id != deleteById;
});

fs.readFile("./db/db.json", "UTF-8", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    const parseNotes = JSON.parse(data);
    const deleted = parseNotes.filter(notId);
    response.JSON(deleted);

    fs.writeFile("./db/db.json", JSON.stringify(deleted), (writeErr) =>
      writeErr ? console.error(writeErr) : console.info("Note deleted!")
    );
  }
});

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port, () => {
  console.log(`App runing at http://localhost:${port}`);
});
