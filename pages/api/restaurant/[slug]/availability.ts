import { NextApiRequest, NextApiResponse } from "next";
import { times } from "@/data";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default async function handler(
    req: NextApiRequest,
    res:  NextApiResponse
    ) {
        const {slug, day, time, partySize} = req.query as {
            slug: string;
            day: string;
            time: string;
            partySize: string;
        }

        if(!day || !time || !partySize) {
            return res.status(400).json({
                errormessage: "Invalid data provided"
            })
        }

        const searchTimes = times.find(t => t.time === time )?.searchTimes;

        if(!searchTimes) {
            return res.status(400).json({
                errormessage: "Invalid data provided"
            })
        }

        const bookings = await prisma.booking.findMany({
            where: {
                booking_time: {
                    gte: new Date(`${day}T${searchTimes[0]}`),
                    lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`)
                }
            },
            select: {
                number_of_people: true,
                booking_time: true,
                tables: true,
            }
        })

        const bookingsObj: {[key: string]: {[key: number]: true}} = {};

        bookings.forEach(booking => {
            bookingsObj[booking.booking_time.toISOString()] = booking.tables.reduce((obj, table) => {
                return {
                    ...obj,
                    [table.table_id]: true
                }
            }, {})            
        })

        const restaurant = await prisma.restaurant.findUnique({
            where: {
                slug
            },
            select: {
                tables: true,
                open_time: true,
                close_time: true,
            }
        });

        if(!restaurant) {
            return res.status(400).json({
                errormessage: "Invalid data provided"
            })
        }

        const tables = restaurant.tables;

        const searchWithTables = searchTimes.map(searchTime => {
            return ({
                date: new Date(`${day}T${searchTime}`),
                time: searchTime,
                tables
            })
        })

        searchWithTables.forEach(t => {
            t.tables = t.tables.filter(table => {
                if(bookingsObj[t.date.toISOString()]) {
                    if(bookingsObj[t.date.toISOString()][table.id]) {
                        return false
                    }
                }
                return true;
            })
        })

        const availabilities = searchWithTables.map(t => {
            const sumTables = t.tables.reduce((sum, table) => {
                return sum + table.seats
            }, 0);

            return {
                time: t.time,
                available: sumTables > parseInt(partySize)
            }
        }).filter(avail => {
            const timeAfterHours = new Date(`${day}T${avail.time}`) >= new Date(`${day}T${restaurant.open_time}`);
            const timeBeforeHours = new Date(`${day}T${avail.time}`) <= new Date(`${day}T${restaurant.close_time}`);
            return (timeAfterHours && timeBeforeHours)
        })

        return res.json({availabilities})
}


// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?day=2023-10-01&time=14:00:00.000Z&partySize=8