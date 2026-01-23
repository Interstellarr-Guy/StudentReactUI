export async function login(username, password) {
  const response = await fetch("https://stuapi-production.up.railway.app/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();

  if (!data.token) {
    throw new Error("No token received");
  }

  localStorage.setItem("token", data.token);
  return data.token;
}
