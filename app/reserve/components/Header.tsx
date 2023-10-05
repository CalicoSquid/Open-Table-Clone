import { convertToDisplayTime, displayTimeObject } from "@/app/utils/convertToDisplayTime";
import { format } from "date-fns"

export default async function Header({
  image,
  name,
  day,
  time,
  partySize,
}: {
  image: string;
  name: string;
  day: string;
  time: string;
  partySize: string;
}) {

  const convertedTime = convertToDisplayTime(time as keyof typeof displayTimeObject);
  return (
    <div>
      <h3 className="font-bold">You're almost done!</h3>
      <div className="mt-5 flex">
        <img src={image} alt="" className="w-32 h-18 rounded" />
        <div className="ml-4">
          <h1 className="text-xxxl font-bold">{name}</h1>
          <div className="flex mt-3">
            <p className="mr-6">{format(new Date(`${day}T${time}`), "ccc, LLL, d")}</p>
            <p className="mr-6">{convertedTime}</p>
            <p className="mr-6">{`${partySize} ${partySize === "1" ? "Person" : "People"}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
