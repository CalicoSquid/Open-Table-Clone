import Header from "../components/Header";
import Form from "../components/Form";
import type { Metadata } from "next";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: "Reserve | OpenTable",
  description: "...",
};

export default async function Reservations({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { date: string; partySize: string };
}) {
  const slug = params.slug;
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
  });

  if (!restaurant) {
    notFound();
  }

  const newDate = searchParams.date.split("T");

  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <Header
          image={restaurant.main_image}
          name={restaurant.name}
          day={newDate[0]}
          time={newDate[1]}
          partySize={searchParams.partySize}
        />
        <Form
          slug={slug}
          partySize={searchParams.partySize}
          day={newDate[0]}
          time={newDate[1]}
        />
      </div>
    </div>
  );
}
