import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { findAvailableTables } from "@/services/restaurant/findAvailableTables";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { slug, day, time, partySize } = req.query as {
      slug: string;
      day: string;
      time: string;
      partySize: string;
    };

    if (!day || !time || !partySize) {
      return res.status(400).json({
        errormessage: "Invalid data provided",
      });
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        slug,
      },
      select: {
        tables: true,
        open_time: true,
        close_time: true,
      },
    });

    if (!restaurant) {
      return res.status(400).json({
        errormessage: "Invalid data provided",
      });
    }

    const searchWithTables = await findAvailableTables({
      time,
      day,
      res,
      restaurant,
    });

    if (!searchWithTables) {
      return res.status(400).json({
        errormessage: "Invalid data provided",
      });
    }

    const availabilities = searchWithTables
      .map((t) => {
        const sumTables = t.tables.reduce((sum, table) => {
          return sum + table.seats;
        }, 0);

        return {
          time: t.time,
          available: sumTables > parseInt(partySize),
        };
      })
      .filter((avail) => {
        const timeAfterHours =
          new Date(`${day}T${avail.time}`) >=
          new Date(`${day}T${restaurant.open_time}`);
        const timeBeforeHours =
          new Date(`${day}T${avail.time}`) <=
          new Date(`${day}T${restaurant.close_time}`);
        return timeAfterHours && timeBeforeHours;
      });

    return res.json(availabilities);
  }
}

// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?day=2023-10-01&time=14:00:00.000Z&partySize=8
