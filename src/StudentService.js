export async function getStudents() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    "https://stuapi-production.up.railway.app/cazoo/5122/list",
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
  );

  return response.json();
}
