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
      <div
        className="shadow-sm border p-5 rounded mx-auto"
        style={{ maxWidth: "600px", marginTop: "100px" }}
      >
        <form onSubmit={onSubmit}>
          <h1>Sign In</h1>
          <label className="form-label mt-4" htmlFor="email">
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

          <div className="mt-4">
            <Link to="/sign-up">
              <p>Don't have an account? Sign up</p>
            </Link>
          </div>
          <button className="btn btn-lg btn-primary mt-4 w-100">Sign In</button>
        </form>
      </div>
    </main>
  );
}
