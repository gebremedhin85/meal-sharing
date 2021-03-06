const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

const port = process.env.PORT || 3000;

const mealsRout = require("./api/meals");
const reservationsRout = require("./api/reservations");

// For week4 no need to look into this!
// Serve the built client html
const buildPath = path.join(__dirname, "./../frontend");
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

router.use("/meals", mealsRout);
router.use("/reservations", reservationsRout);

app.use("/api", router);

// For week4 no need to look into this!
// Ensures that the client router works on reload aswell.
// Sends all requests back to index.html where the routing lib takes over
app.get("/*", function (req, res) {
	res.sendFile(path.join(__dirname, "./../frontend/index.html"));
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
