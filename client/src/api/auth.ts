const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Signin
export const signIn = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/api/v1/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
            throw new Error("Incorrect email or password.");
        } else {
            throw new Error(errorData.message || "Login failed.");
        }
    }

    const data = await response.json();
    return data;
};

// Signup
export const signUp = async (formData: { username: string; email: string; password: string }) => {
    const response = await fetch(`${API_URL}/api/v1/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed.");
    }
  
    return response.json();
  };
  

