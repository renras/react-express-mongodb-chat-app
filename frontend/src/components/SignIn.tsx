import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

export default function Home() {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;

    try {
      // todo: add sign in logic here and reroute to index page after successful sign up
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
        <input className="form-control" type="text" {...register("password")} />

        <div className="mt-3">
          {/* todo: use react router to link to sign up page */}
          {/* <Link href="/sign-up">
            <p>Sign up instead</p>
          </Link> */}
        </div>
        <button className="btn btn-primary mt-5 d-block">Submit</button>
      </form>
    </main>
  );
}
