import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type FormData = {
  message: string;
};

type Message = {
  createdAt: Date;
  body: string;
  from: string;
};

type User = {
  email: string;
  _id: string;
};

export default function Home() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [messagesError, setMessagesError] = useState(false);

  // todo: fetch chat messages

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/v1/users/me");
        const user = response.data;

        if (user) {
          setUser(user);
        } else {
          navigate("/sign-in");
        }
      } catch (error) {
        setUserError(true);
      } finally {
        setUserLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/v1/messages");
        const messages = response.data;

        setMessages(messages);
      } catch (error) {
        setMessagesError(true);
      } finally {
        setMessagesLoading(false);
      }
    })();
  }, []);

  const handleLogout = async () => {
    // todo: add signout logic here
  };

  const handleCreateMessage = handleSubmit(async (data) => {
    try {
      // todo: add create message logic here
      const response = await axios.post("/api/v1/messages", {
        body: data.message,
        from: user?.email,
      });

      const message = response.data;

      setMessages([...messages, message]);

      reset();
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    }
  });

  if (userLoading || messagesLoading) return <div>Loading...</div>;
  if (userError || messagesError) return <div>Error...</div>;

  return (
    <main className="container">
      <div className="d-flex gap-4 align-items-center mt-5">
        <h1>Chat App</h1>
        <button
          className="btn btn-danger d-block"
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      </div>

      <div className="mt-5 d-flex flex-column gap-3">
        {messages.length > 0 &&
          messages.map((message, index) => (
            <div
              key={index}
              className="d-inline-flex flex-column p-3 border shadow-sm"
            >
              <p>Sender: {message.from}</p>
              <p>Message: {message.body}</p>
            </div>
          ))}
      </div>

      <form onSubmit={handleCreateMessage}>
        <textarea
          className="form-control mt-5"
          {...register("message")}
          placeholder="Enter a message"
        />
        <button className="btn btn-primary mt-4">Send</button>
      </form>
    </main>
  );
}
