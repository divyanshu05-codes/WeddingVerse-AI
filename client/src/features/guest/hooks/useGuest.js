import { useEffect, useState } from "react";
import { getGuestsByWedding } from "../services/guest.api";

function useGuest(weddingId) {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("Hook Loaded");
  console.log("Wedding ID:", weddingId);

  useEffect(() => {
    console.log("useEffect Running");

    const fetchGuests = async () => {
      try {
        console.log("Calling Guest API...");

        const res = await getGuestsByWedding(weddingId);

        console.log("API Response:", res.data);

        setGuests(res.data.data);
      } catch (error) {
        console.error("Guest Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (weddingId) {
      fetchGuests();
    } else {
      console.log("Wedding ID Missing");
      setLoading(false);
    }
  }, [weddingId]);

  return {
    guests,
    loading,
  };
}

export default useGuest;