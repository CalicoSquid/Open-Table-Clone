

export default function Header({name}: {name: string}) {

  const renderTitle = (name: any) => {
    let restaurantName = name.split("-")
    let restaurantLocation = restaurantName.pop()
    restaurantName.push(`(${restaurantLocation})`)

    return restaurantName.join(" ")
  }
  

  return (
    <div className="h-96 overflow-hidden">
      <div
        className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center"
      >
        <h1 className="text-xxxxl text-white capitalize text-shadow text-center">
          {renderTitle(name)}
        </h1>
      </div>
    </div>
  )
}
