import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
};

const SignUp = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;
    try {
      await axios.post("/api/v1/auth/register", {
        email,
        password,
      });

      navigate("/sign-in");
    } catch {
      alert("Sign up failed");
    }
  });

  return (
    <main className="container">
      <form onSubmit={onSubmit}>
        <h1 className="mt-5">Sign Up</h1>
        <label className="form-label mt-3" htmlFor="email">
          Email
        </label>
        <input className="form-control" type="email" {...register("email")} />
        <label className="form-label mt-3" htmlFor="password">
          Password
        </label>
        <input
          className="form-control"
          type="password"
          {...register("password")}
        />
        <div className="mt-3">
          <Link to="/sign-in">
            <p>Sign in instead</p>
          </Link>
        </div>
        <button className="btn btn-primary mt-5">Sign Up</button>
      </form>
    </main>
  );
};

export default SignUp;
