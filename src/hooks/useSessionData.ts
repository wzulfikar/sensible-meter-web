import { API_ENDPOINT } from "@src/config";
import { useQuery } from "@tanstack/react-query"

export const useSessionData = ({ session_id }) => {
  return useQuery(
    ['sessions', session_id],
    async () => {
      console.log("fetching session..")
      if (!session_id) {
        console.log("[SKIP] no session id")
        return {} as any;
      }

      // const result = await fetch(
      //   API_ENDPOINT + `/api/v1/session/get_session?session_id=${session_id}`
      // ).then(res => res.json());

      // Uncomment to use fixture
      const result = await import("../../fixtures/get_session.json")

      const data = result?.session_data;
      if (!data) {
        console.log("[WARN] no estimation found. session_id:", session_id)
      }

      return data || {} as any;
    },
    { refetchInterval: 5000 }
  );
}
