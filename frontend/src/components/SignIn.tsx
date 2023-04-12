import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

type FormData = {
  email: string;
  password: string;
};

export default function Home() {
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;

    try {
      await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      navigate("/");
    } catch (error) {
      alert("Failed to sign in");
    }
  });

  return (
    <main className="container">
      <form onSubmit={onSubmit}>
        <h1 className="mt-5">Sign In</h1>
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
          <Link to="/sign-up">
            <p>Sign up instead</p>
          </Link>
        </div>
        <button className="btn btn-primary mt-5 d-block">Sign In</button>
      </form>
    </main>
  );
}
