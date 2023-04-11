import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

type FormData = {
  message: string;
};

type Message = {
  createdAt: number;
  message: string;
  sender: string;
};

export default function Home() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const messages: Message[] = [];

  // todo: if not authenticated, redirect user to sign in page
  // todo: fetch chat messages

  const handleLogout = async () => {
    // todo: add signout logic here
  };

  const handleCreateMessage = handleSubmit(async (data) => {
    try {
      // todo: add create message logic here

      reset();
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    }
  });

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
              <p>Sender: {message.sender}</p>
              <p>Message: {message.message}</p>
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
