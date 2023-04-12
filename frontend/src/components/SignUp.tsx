import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const { email, password, confirmPassword } = data;
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }
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
      <div
        className="shadow-sm border p-5 rounded mx-auto"
        style={{ maxWidth: "600px", marginTop: "100px" }}
      >
        <form onSubmit={onSubmit}>
          <h1>Sign Up</h1>
          <label className="form-label mt-4" htmlFor="email">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            {...register("email", { required: true })}
          />
          <label className="form-label mt-4" htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            {...register("password", { required: true })}
          />
          <label className="form-label mt-4" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="form-control"
            type="password"
            {...register("confirmPassword", { required: true })}
          />
          <div className="mt-4">
            <Link to="/sign-in">
              <p>Already have an account? Sign in</p>
            </Link>
          </div>
          <button className="btn btn-lg btn-primary mt-4 w-100">Sign Up</button>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
