import api from "./api/api";

export async function getStudents() {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found. User not logged in.");
    return []; // prevent crash
  }

  const response = await fetch(
    "https://stuapi-production.up.railway.app/cazoo/5122/list",
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );

  if (!response.ok) {
    console.error("API Error:", response.status);
    return [];
  }

  return response.json();
}
