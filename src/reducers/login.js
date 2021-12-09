const initialState = {
  role: "",
  token: "",
  userID: "",
};

const signIn = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      const { role, token, userID } = payload;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userID", userID);
      console.log(`role ${role} , token ${token} userid ${userID}`);
      return { role, token, userID };

    case "LOGOUT":
      localStorage.clear();
      return { role: "", token: "", userID: "" };

    default:
      const localToken = localStorage.getItem("token");
      const localRole = localStorage.getItem("role");
      const localUserId = localStorage.getItem("userID");
      if (localToken) {
        return { token: localToken, role: localRole, userID: localUserId };
      }
      return state;
  }
};

export default signIn;

export const logIn = (data) => {
  return {
    type: "LOGIN",
    payload: data,
  };
};

export const logOut = (data) => {
  return { type: "LOGOUT", payload: {} };
};
