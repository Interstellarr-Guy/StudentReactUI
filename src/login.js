export async function login(username, password) {
  const response = await fetch("https://stuapi-production.up.railway.app/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();
  localStorage.setItem("token", data.token);
}
