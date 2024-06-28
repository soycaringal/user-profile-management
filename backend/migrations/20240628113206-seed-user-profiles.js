// migrations/YYYYMMDDHHMMSS-seed-user-profiles.js

module.exports = {
  async up(db, client) {
    // Insert seed data into the userprofiles collection
    await db.collection('userprofiles').insertMany([
      {
        name: "John Doe",
        email: "john.doe@example.com",
        age: 30,
        tags: ["developer", "team lead"]
      },
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        age: 25,
        tags: ["designer", "UI/UX"]
      },
      {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        age: 28,
        tags: ["manager", "HR"]
      }
    ]);
  },

  async down(db, client) {
    // Optionally remove the seed data
    await db.collection('userprofiles').deleteMany({
      email: { $in: ["john.doe@example.com", "jane.smith@example.com", "alice.johnson@example.com"] }
    });
  }
};
