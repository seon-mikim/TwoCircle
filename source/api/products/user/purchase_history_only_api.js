import { headers, url } from "../../requests.js";

export async function purchaseHistoryOnly(data) {
  const res = await fetch(url + "/products/transactions/detail", {
    method: "POST",
    headers: {
      ...headers,
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("accessToken")
      )}`,
    },
    body: JSON.stringify({
      detailId: data.detailId,
    }),
  });
  return await res.json();
}
