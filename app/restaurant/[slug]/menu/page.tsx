import Header from "../components/Header";
import RestaurantNav from "../components/RestaurantNav";
import Menu from "../components/Menu";
import { Item, PrismaClient } from "@prisma/client";

interface RestaurantMenu {
  items: Item[];
}

const prisma = new PrismaClient();

const fetchItems = async (slug: string): Promise<RestaurantMenu> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug
    },
    select: {
      items: true
    }
  })

  if (!restaurant) {
    throw Error("Error")
  }

  return restaurant;
}

export default async function RestaurantMenu({params}: {params: {slug: string}}) {

  const slug = params.slug;
  const menu = await fetchItems(params.slug)
  console.log(menu.items)
  return (
        <div className="bg-white w-[100%] rounded p-3 shadow">
          <RestaurantNav slug={slug}/>
          <Menu items={menu.items}/>
        </div>
  )
}
