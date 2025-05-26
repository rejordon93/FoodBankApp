import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.foodBank.createMany({
    data: [
      {
        name: "Sunrise Food Bank",
        address: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        phone: "(212) 555-1234",
        email: "contact@sunrisefoodbank.org",
        website: "https://www.sunrisefoodbank.org",
        description:
          "Providing nutritious food to families in need across New York City.",
        timeOpen: new Date("2023-01-01T08:00:00.000Z"),
        timeClose: new Date("2023-01-01T17:00:00.000Z"),
        daysOpen: "Mon-Fri",
      },
      {
        name: "Westside Community Pantry",
        address: "456 Oak Ave",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90001",
        phone: "(310) 555-5678",
        email: "info@westsidepantry.org",
        website: "https://www.westsidepantry.org",
        description:
          "Serving healthy meals and groceries to the Westside LA community.",
        timeOpen: new Date("2023-01-01T09:00:00.000Z"),
        timeClose: new Date("2023-01-01T18:00:00.000Z"),
        daysOpen: "Tue-Sat",
      },
      {
        name: "Green Valley Food Share",
        address: "789 Pine Rd",
        city: "Austin",
        state: "TX",
        zipCode: "73301",
        phone: "(512) 555-9876",
        email: "hello@greenvalleyfoodshare.org",
        website: "https://www.greenvalleyfoodshare.org",
        description:
          "Community-driven food sharing initiative focusing on sustainability.",
        timeOpen: new Date("2023-01-01T07:30:00.000Z"),
        timeClose: new Date("2023-01-01T16:30:00.000Z"),
        daysOpen: "Mon-Fri",
      },
      {
        name: "Hope Harvest Food Bank",
        address: "321 Elm St",
        city: "Chicago",
        state: "IL",
        zipCode: "60601",
        phone: "(773) 555-4321",
        email: "support@hopeharvest.org",
        website: "https://www.hopeharvest.org",
        description:
          "Helping Chicago families access fresh and healthy food options.",
        timeOpen: new Date("2023-01-01T08:30:00.000Z"),
        timeClose: new Date("2023-01-01T17:30:00.000Z"),
        daysOpen: "Mon-Sat",
      },
      {
        name: "Lakeside Food Pantry",
        address: "654 Maple Blvd",
        city: "Seattle",
        state: "WA",
        zipCode: "98101",
        phone: "(206) 555-7654",
        email: "contact@lakesidepantry.org",
        website: "https://www.lakesidepantry.org",
        description:
          "Providing food support with dignity and respect to Seattle residents.",
        timeOpen: new Date("2023-01-01T10:00:00.000Z"),
        timeClose: new Date("2023-01-01T19:00:00.000Z"),
        daysOpen: "Wed-Sun",
      },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
