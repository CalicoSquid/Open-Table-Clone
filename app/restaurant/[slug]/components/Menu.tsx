import { Item } from "@prisma/client";
import MenuCard from "./MenuCard";

export interface MenuType {
  id: number,
  name: string,
  price: string,
  description: string,
}


export default function Menu({items}: {items: Item[]}) {

  const menu = items.map(item => {
    return <MenuCard item={item}/>
  })
  return (
    <main className="bg-white mt-5">
          <div>
            <div className="mt-4 pb-1 mb-1">
              <h1 className="font-bold text-4xl">Menu</h1>
            </div>
            <div className="flex flex-wrap justify-between">
              {menu.length > 0 ? menu : <h2>No Menu available</h2>}
            </div>
          </div>
        </main>
  )
}
