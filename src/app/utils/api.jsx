export async function loginUser(credentials) {
  try {
    const res = await fetch("http://31.97.41.249/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return await res.json();
  } catch (err) {
    console.error("Login API error:", err);
    return { success: false, message: "Network error" };
  }
}

export async function registerUser(credentials) {
  try {
    const res = await fetch("http://31.97.41.249/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return await res.json();
  } catch (err) {
    console.error("Register API error:", err);
    return { success: false, message: "Network error" };
  }
}
