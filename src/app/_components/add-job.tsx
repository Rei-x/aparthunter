"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import React from "react";
import { toast } from "sonner";

export const AddJob = () => {
  const addPost = api.post.addJob.useMutation({
    onError: (error) => {
      toast(error.message);
    },
  });
  return (
    <Button
      loading={addPost.isPending}
      onClick={() => {
        addPost.mutate();
      }}
    >
      Add job
    </Button>
  );
};
