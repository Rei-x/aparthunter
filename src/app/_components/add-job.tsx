"use client";

import { api } from "@/trpc/react";
import React from "react";

export const AddJob = () => {
  const addPost = api.post.addJob.useMutation();
  return (
    <button
      onClick={() => {
        addPost.mutate({ name: "Hello" });
      }}
    >
      Add job
    </button>
  );
};
