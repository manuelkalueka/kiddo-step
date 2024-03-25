export function signInService() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: "ddjhsjfhsjfhjsbfuehfdjhfjdhfidfuiytrhg",
        user: {
          name: "Manuel Kalueka",
          email: "kalueka@gmail.com",
        },
      });
    }, 2000);
  });
}
