const { Sequelize, STRING, ENUM } = require("sequelize");
const db = new Sequelize(
  process.env.DATABASE_URL ||
    "postgres://localhost/dealers_choice_react_webpack"
);

const Wine = db.define("wine", {
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  type: {
    type: ENUM("Cabernet Sauvignon", "Merlot", "Chardonnay", "Pinot Noir"),
  },
});

Wine.generateRandom = function () {
  const randomNumber = Math.ceil(Math.random() * 1000);
  let wineType = "";
  if (randomNumber % 2 === 0) wineType = "Cabernet Sauvignon";
  else if (randomNumber % 3 === 0) wineType = "Merlot";
  else if (randomNumber % 5 === 0) wineType = "Chardonnay";
  else wineType = "Pinot Noir";
  return this.create({ name: `Wine ${randomNumber}`, type: wineType });
};

// const Origin = db.define("origin", {
//   name: {
//     type: STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: true,
//     },
//   },
// });

// Wine.belongsTo(Origin);
// Origin.hasMany(Wine);

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });

    // await hello.update({ originId: 1 });
    await Promise.all([
      Wine.create({
        name: "O’Shaughnessy",
        type: "Cabernet Sauvignon",
      }), //California
      Wine.create({
        name: "Santa Rita",
        type: "Cabernet Sauvignon",
      }), //Chile

      Wine.create({ name: "Duckhorn Vineyards", type: "Merlot" }), //CA
      Wine.create({ name: "Marilyn Monroe", type: "Merlot" }), //CA
      Wine.create({ name: "Stags' Leap", type: "Merlot" }), //CA
      Wine.create({ name: "Pahlmeyer", type: "Merlot" }), //CA

      Wine.create({ name: "Domaine Serene", type: "Pinot Noir" }), //Oregon
      Wine.create({ name: "Gary Farrell", type: "Pinot Noir" }), //CA
      Wine.create({ name: "Greywacke", type: "Pinot Noir" }), //Marlborough New Zealand
      Wine.create({
        name: "Antica Terra Coriolis",
        type: "Pinot Noir",
      }), //Oregon

      Wine.create({ name: "White Stones", type: "Chardonnay" }), //Argentina
      Wine.create({
        name: "Domaine du Colombier Bougros",
        type: "Chardonnay",
      }), //France
      Wine.create({
        name: "Chateau Ste Michelle",
        type: "Chardonnay",
      }), //Washington

      // Origin.create({ name: "California" }),
      // Origin.create({ name: "Chile" }),
      // Origin.create({ name: "Oregon" }),
      // Origin.create({ name: "Marlborough" }),
      // Origin.create({ name: "Argentina" }),
      // Origin.create({ name: "France" }),
      // Origin.create({ name: "Washington" }),
    ]);
  } catch (err) {
    console.log(err);
  }
};

syncAndSeed();

const express = require("express");
const app = express();
const path = require("path");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.get("/api/wines", async (req, res, next) => {
  try {
    res.send(await Wine.findAll());
  } catch (err) {
    next(err);
  }
});

app.post("/api/wines", async (req, res, next) => {
  try {
    res.status(201).send(await Wine.generateRandom());
  } catch (err) {
    next(err);
  }
});

app.delete("/api/wines/:id", async (req, res, next) => {
  try {
    const wineToDelete = await Wine.findByPk(req.params.id);
    await wineToDelete.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

app.get("/api/wines/:id", async (req, res, next) => {
  try {
    res.send(await Wine.findByPk(req.params.id));
  } catch (err) {
    next(err);
  }
});

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/index.html")));
app.use("/dist", express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "public")));
