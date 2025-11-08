const API_URL = "http://34.234.85.99:5000/api/data";

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
