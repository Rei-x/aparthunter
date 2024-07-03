"use client";

import { api } from "@/trpc/react";
import React from "react";

export const Scrappers = () => {
  const healthy = api.post.health.useQuery(undefined, {
    refetchInterval: 1000,
  });

  return (
    <div>
      <h2>Scrappers health</h2>
      <ul>
        {healthy.data?.map((isHealthy, i) => (
          <li key={i}>
            {isHealthy.name}: {isHealthy.waiting} waiting, {isHealthy.completed}{" "}
            completed, {isHealthy.failed} failed
          </li>
        ))}
      </ul>
    </div>
  );
};
