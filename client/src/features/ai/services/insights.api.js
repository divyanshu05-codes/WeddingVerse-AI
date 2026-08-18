import api from "../../../api/axios";

export const generateWeddingInsights = (
  weddingId
) => {
  return api.post(
    `/ai/weddings/${weddingId}/insights`
  );
};

export const getWeddingInsights = (
  weddingId
) => {
  return api.get(
    `/ai/weddings/${weddingId}/insights`
  );
};