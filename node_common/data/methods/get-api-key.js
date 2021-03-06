import { runQuery } from "~/node_common/data/utilities";

export default async ({ id }) => {
  return await runQuery({
    label: "GET_API_KEY",
    queryFn: async (DB) => {
      const query = await DB.select("*")
        .from("keys")
        .where({ id })
        .first();

      if (!query || query.error) {
        return null;
      }

      if (query.id) {
        return query;
      }

      return null;
    },
    errorFn: async (e) => {
      return {
        error: "GET_API_KEY",
        source: e,
      };
    },
  });
};
