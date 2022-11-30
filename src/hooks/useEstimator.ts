import { useQuery } from "@tanstack/react-query"

const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT || "https://a6c2-87-92-48-118.eu.ngrok.io"

export const useEstimator = ({ session_id }) => {
  return useQuery(
    ['sessions', session_id],
    async () => {
      const result = await fetch(
        endpoint + `/api/v1/session/get_session?session_id=${session_id}`
      ).then(res => res.json());

      // Uncomment to use fixture
      // const result = await import("../../fixtures/get_session.json")

      const estimation = result?.session_data?.estimation;
      if (!estimation) {
        console.log("[WARN] no estimation found. session_id:", session_id)
      }

      return estimation || [];
    },
    { refetchInterval: 5000 }
  );
}
