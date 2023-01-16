const express = require("express");

const app = express();
const PORT = 3001;
const { connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoute");
const playListsRoutes = require("./routes/playListRoute");
const songRoutes = require("./routes/songRoutes")

connectDB();
//middleware
app.use(express.json());
app.use(express.static("content"));
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRoutes);
app.use("/api/playlists", playListsRoutes);
app.use("/api/songs", songRoutes)


app.listen(PORT, () => {
  console.log("server is running at", PORT);
});
