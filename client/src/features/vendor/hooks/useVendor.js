import { useEffect, useState } from "react";

import {
  getVendorsByWedding,
  getVendorById,
} from "../services/vendor.api";

export default function useVendor(weddingId, vendorId = null) {
  const [vendors, setVendors] = useState([]);
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchVendors = async () => {
    try {
      setLoading(true);

      const res = await getVendorsByWedding(weddingId);

      setVendors(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch vendors:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVendor = async () => {
    try {
      setLoading(true);

      const res = await getVendorById(vendorId);

      setVendor(res.data.data);
    } catch (error) {
      console.error("Failed to fetch vendor:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (vendorId) {
      fetchVendor();
    } else if (weddingId) {
      fetchVendors();
    }
  }, [weddingId, vendorId]);

  return {
    vendors,
    vendor,
    loading,
    fetchVendors,
    fetchVendor,
  };
}