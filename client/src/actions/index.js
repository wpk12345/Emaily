import axios from "axios";
import { FETCH_USER } from "./types";

//action creater
//highly modified refactor.  see the second block of code starting on line 13
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

//==============Above is a refactor of the following 7 lines============================================
// export const fetchUser = () => {
//   return function(dispatch) {
//     axios
//       .get("/api/current_user")
//       .then(res => dispatch({ type: FETCH_USER, payload: res }));
//   };
// };


//2nd action creator to post our stripe token to the backend server

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);

  dispatch({ type: FETCH_USER, payload: res.data });
};
