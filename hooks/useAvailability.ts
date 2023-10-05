import { useState } from "react";
import axios from "axios";

const url =
  process.env.STATUS === "dev"
    ? "http://localhost:3000"
    : "https://zingy-empanada-6a5fca.netlify.app";

export default function useAvailability() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<
    { time: string; available: boolean }[] | null
  >(null);

  const fetchAvailibilities = async ({
    slug,
    partySize,
    day,
    time,
  }: {
    slug: string;
    partySize: string;
    day: string;
    time: string;
  }) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${url}/api/restaurant/${slug}/availability`,
        {
          params: {
            day,
            time,
            partySize,
          },
        }
      );
      setLoading(false);
      setData(response.data);
    } catch (err: any) {
      setLoading(false);
      setError(err.response.data.errorMessage);
    }
  };

  return { loading, data, error, fetchAvailibilities };
}
