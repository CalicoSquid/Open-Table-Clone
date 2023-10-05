import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";

const url =
  process.env.STATUS === "dev"
    ? "http://localhost:3000"
    : "https://zingy-empanada-6a5fca.netlify.app";

export default function useReservation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createBooking = async ({
    bookerFirstName,
    bookerLastName,
    bookerPhone,
    bookerEmail,
    bookerRequest,
    bookerOccasion,
    slug,
    partySize,
    day,
    time,
    setDidBook,
  }: {
    bookerFirstName: string;
    bookerLastName: string;
    bookerPhone: string;
    bookerEmail: string;
    bookerRequest: string;
    bookerOccasion: string;
    slug: string;
    partySize: string;
    day: string;
    time: string;
    setDidBook: Dispatch<SetStateAction<boolean>>;
  }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${url}/api/restaurant/${slug}/reserve`,
        {
          bookerFirstName,
          bookerLastName,
          bookerPhone,
          bookerEmail,
          bookerRequest,
          bookerOccasion,
        },
        {
          params: {
            day,
            time,
            partySize,
          },
        }
      );
      setLoading(false);
      setDidBook(true)
      return response.data;
    } catch (err: any) {
      setLoading(false);
      setError(err.response.data.errorMessage);
      setDidBook(false)
    }
  };
  return { loading, error, createBooking };
}
