"use strict";

const {
  db,
  models: { User, DrawingPrompt },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody",
      password: "123",
      email: "cody@gmail.com",
      isAdmin: true,
      bio: "I love the game of Pictionary! Yay me!",
      totalScore: 2000000,
    }),
    User.create({
      username: "murphy",
      password: "123",
      email: "murphy@gmail.com",
      isAdmin: false,
    }),
  ]);

  const prompts = await Promise.all([
    DrawingPrompt.create({
      word: "cat",
    }),
    DrawingPrompt.create({
      word: "dog",
    }),
    DrawingPrompt.create({
      word: "house",
    }),
    DrawingPrompt.create({
      word: "shoes",
    }),
    DrawingPrompt.create({
      word: "pants",
    }),
    DrawingPrompt.create({
      word: "fish",
    }),
    DrawingPrompt.create({
      word: "laptop",
    }),
    DrawingPrompt.create({
      word: "basketball",
    }),
    DrawingPrompt.create({
      word: "boat",
    }),
    DrawingPrompt.create({
      word: "sun",
    }),
    DrawingPrompt.create({
      word: "sofa",
    }),
    DrawingPrompt.create({
      word: "pizza",
    }),
    DrawingPrompt.create({
      word: "javascript",
    }),
    DrawingPrompt.create({
      word: "earth",
    }),
    DrawingPrompt.create({
      word: "apple",
    }),
    DrawingPrompt.create({
      word: "pumpkin",
    }),
    DrawingPrompt.create({
      word: "turkey",
    }),
    DrawingPrompt.create({
      word: "tree",
    }),
    DrawingPrompt.create({
      word: "horse",
    }),
    DrawingPrompt.create({
      word: "mountain",
    }),
    DrawingPrompt.create({
      word: "moon",
    }),
    DrawingPrompt.create({
      word: "star",
    }),
    DrawingPrompt.create({
      word: "shark",
    }),
    DrawingPrompt.create({
      word: "dinosaur",
    }),
    DrawingPrompt.create({
      word: "chicken",
    }),
    DrawingPrompt.create({
      word: "slide",
    }),
    DrawingPrompt.create({
      word: "car",
    }),
    DrawingPrompt.create({
      word: "plane",
    }),
    DrawingPrompt.create({
      word: "helicopter",
    }),
    DrawingPrompt.create({
      word: "cheese",
    }),
    DrawingPrompt.create({
      word: "book",
    }),
    DrawingPrompt.create({
      word: "train",
    }),
    DrawingPrompt.create({
      word: "school",
    }),
    DrawingPrompt.create({
      word: "baseball",
    }),
    DrawingPrompt.create({
      word: "cloud",
    }),
    DrawingPrompt.create({
      word: "balloon",
    }),
    DrawingPrompt.create({
      word: "sunflower",
    }),
    DrawingPrompt.create({
      word: "rose",
    }),
    DrawingPrompt.create({
      word: "guitar",
    }),
    DrawingPrompt.create({
      word: "flashlight",
    }),
    DrawingPrompt.create({
      word: "ruler",
    }),
    DrawingPrompt.create({
      word: "piano",
    }),
    DrawingPrompt.create({
      word: "keyboard",
    }),
    DrawingPrompt.create({
      word: "hourglass",
    }),
    DrawingPrompt.create({
      word: "mask",
    }),
    DrawingPrompt.create({
      word: "earrings",
    }),
    DrawingPrompt.create({
      word: "rake",
    }),
    DrawingPrompt.create({
      word: "mirror",
    }),
    DrawingPrompt.create({
      word: "volcano",
    }),
    DrawingPrompt.create({
      word: "music",
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
