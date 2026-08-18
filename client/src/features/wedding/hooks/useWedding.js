import { useEffect, useState } from "react";
import {
  getAllWeddings,
  getWeddingById,
} from "../services/wedding.api";

export default function useWedding(weddingId) {
  const [wedding, setWedding] = useState(null);
  const [weddings, setWeddings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWedding = async () => {
    try {
      if (weddingId) {
        const res = await getWeddingById(weddingId);
        setWedding(res.data.data);
      } else {
        const res = await getAllWeddings();
        setWeddings(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch wedding(s):", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWedding();
  }, [weddingId]);

  return {
    wedding,
    weddings,
    loading,
    fetchWedding,
  };
}