"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

type TeamInput = {
  name: string;
};

type FormData = {
  teams: TeamInput[];
};

export default function GenerateTeamsForm() {
  const router = useRouter();

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      teams: [{ name: "Team 1" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "teams",
  });

  const client = useQueryClient();

  const onSubmit = async (data: FormData) => {
    const response = await fetch("/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data.teams),
    });

    if (response.ok) {
      client.invalidateQueries({ queryKey: ["teamList"] });
      reset({ teams: [{ name: "" }] });
      router.refresh();
    } else {
      console.error("Failed to generate teams");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center space-x-2">
            <Controller
              name={`teams.${index}.name`}
              control={control}
              rules={{ required: "Team name is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder={`Team ${index + 1}`}
                  className="flex-grow text-black p-1"
                />
              )}
            />
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => append({ name: `Team ${fields.length + 1}` })}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Add Team
          </button>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
