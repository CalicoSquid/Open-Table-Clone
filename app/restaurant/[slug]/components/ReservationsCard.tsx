"use client";
import {
  convertToDisplayTime,
  displayTimeObject,
} from "@/app/utils/convertToDisplayTime";
import { partySize as partySizes, times } from "@/data";
import useAvailability from "@/hooks/useAvailability";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import DatePicker from "react-datepicker";

export default function ReservationsCard({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string;
  closeTime: string;
  slug: string;
}) {
  const filterTimeByRestaurantOpenWindow = () => {
    const timesWithinWindow: typeof times = [];

    let isWithinWindow = false;

    times.forEach((time) => {
      if (time.time === openTime) {
        isWithinWindow = true;
      }
      if (isWithinWindow) {
        timesWithinWindow.push(time);
      }
      if (time.time === closeTime) {
        isWithinWindow = false;
      }
    });

    return timesWithinWindow;
  };

  const { loading, data, error, fetchAvailibilities } = useAvailability();
  const [time, setTime] = useState(openTime);
  const [partySize, setPartySize] = useState("2");
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDay(date.toISOString().split("T")[0]);
      setSelectedDate(date);
    } else {
      setSelectedDate(null);
    }
  };

  const handleClick = () => {
    fetchAvailibilities({
      slug,
      day,
      time,
      partySize,
    });
    console.log(partySizes);
  };

  return (
    <div className="fixed w-[15%] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select
          name=""
          className="py-3 border-b font-light"
          id=""
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
        >
          {partySizes.map((num) => (
            <option value={num.value} key={num.value}>
              {num.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleChangeDate}
            className="py-3 border-b w-24 text-reg font-light"
            wrapperClassName="w-[48%]"
            dateFormat={"MMMM d"}
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select
            name=""
            id=""
            className="py-3 border-b font-light"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            {filterTimeByRestaurantOpenWindow().map((time) => (
              <option value={time.time}>{time.displayTime}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button
          className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
          onClick={handleClick}
          disabled={loading}
        >
          {!loading ? "Find a Time" : <CircularProgress color="inherit" />}
        </button>
      </div>
      {data && data.length ? (
        <div className="mt-4">
          <p className="txt-reg">Select a Time</p>
          <div className="flex flex-wrap mt-2">
            {data.map((d) => {
              if (d.available) {
                const convertedTime = convertToDisplayTime(
                  d.time as keyof typeof displayTimeObject
                );

                return (
                  <Link
                    href={`/reserve/${slug}?date=${day}T${d.time}&partySize=${partySize}`}
                    className="bg-red-600 cursor-pointer w-24 text-center text-white rounded mb-3 mr-3 p-2"
                  >
                    <p className="text-sm font-bold">{convertedTime}</p>
                  </Link>
                );
              } else {
                return <div className="bg-gray-300 rounded w-24 mb-3 mr-3 p-4"></div>;
              }
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
