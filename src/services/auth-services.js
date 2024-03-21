async function getUserLogged() {
  try {
    const response = await fetch(`${process.env.URL_BASE}/users/login`, {
      method: POST,
      body: {
        email: "mkaldev.08@gmail.com",
        password: "COD2004k",
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}
async function signIn(email, password) {
  const user = {
    name: "Manuel Kalueka",
    email,
    token: "mykotekn123oidjdbdbd",
  };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password === "1234") resolve(user);
      else reject("Credenciais Inválidas");
    }, 500);
  });
}

async function signOut() {}

export const AuthService = { signIn };
