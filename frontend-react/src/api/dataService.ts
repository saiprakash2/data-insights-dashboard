const API_URL = "http://localhost:5288/api/data";

export async function getData() {
  const response = await fetch(API_URL);
  return response.json();
}

export async function addData(record: { category: string; amount: number }) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
  });
  return response.json();
}
