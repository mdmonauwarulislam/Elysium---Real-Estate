import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    signInFailure,
    signInStart,
    signInSuccess,
} from "../redux/User/userSlice";
import OAuth from "../components/OAuth";
export default function SignIn() {
    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(signInStart());
            const res = await fetch(`${import.meta.env.VITE_API}/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();


            if (data.success === false) {
                dispatch(signInFailure(data.message));

                return;
            }
            dispatch(signInSuccess(data));
            navigate("/");
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
            <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="email"
                    className="border p-3 rounded-lg"
                    id="email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="password"
                    className="border p-3 rounded-lg"
                    id="password"
                    onChange={handleChange}
                />
                <button
                    disabled={loading}
                    className="bg-slate-700 text-center text-white p-3 rounded-lg  hover:opacity-85 disabled:opacity-70 active:opacity-100 "
                >
                    {loading ? " Loading.." : " Sign In"}
                </button>

                <OAuth />
            </form>

            <div className="flex gap-2 mt-5">
                <p>dont an account?</p>
                <Link to={"/sign-up"}>
                    <span className="text-blue-700">Sign Up</span>
                </Link>
            </div>

            {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
    );
}
