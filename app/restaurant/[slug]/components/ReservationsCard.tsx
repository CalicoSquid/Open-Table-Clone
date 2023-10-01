"use client"
import { partySize, times } from "@/data"
import { useState } from "react"
import DatePicker from "react-datepicker"

export default function ReservationsCard(
  {openTime, closeTime} 
  :
  {
    openTime: string, 
    closeTime: string
  }) {

  const timesList = times.map((time, i) => {
    if(time.time >= openTime && time.time <= closeTime) {
      return <option value={time.time} key={i}>{time.displayTime}</option>
    }
  
})

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  const handleChangeDate = (date: Date | null) => {
    if(date) {
      return setSelectedDate(date)
    } else {
      setSelectedDate(null)
    }
  }

  return (
    <div className="fixed w-[15%] bg-white rounded p-3 shadow">
          <div className="text-center border-b pb-2 font-bold">
            <h4 className="mr-7 text-lg">Make a Reservation</h4>
          </div>
          <div className="my-3 flex flex-col">
            <label htmlFor="">Party size</label>
            <select name="" className="py-3 border-b font-light" id="">
              {partySize.map(num => <option value={num.value} key={num.value}>{num.label}</option>)}
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
              <select name="" id="" className="py-3 border-b font-light">
                {timesList}
              </select>
            </div>
          </div>
          <div className="mt-5">
            <button
              className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
            >
              Find a Time
            </button>
          </div>
        </div>
  )
}
