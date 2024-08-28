//reactfuntionalComponent
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGooleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      //I need to create api-api side
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("cant log in with Google", error);
    }
  };
  return (
    <button
      onClick={handleGooleClick}
      type="button"
      className="bg-red-500 text-white  uppercase  hover:opacity-80 rounded-lg p-3"
    >
      Conitue with Google
    </button>
  );
}