"use client";
import { useRouter } from "next/navigation";
import {
  useForm,
  useFieldArray,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import RatingInput from "./rating-input";
import { useQueryClient } from "@tanstack/react-query";

type PlayerInput = {
  name: string;
  rating: number;
};

type TPlayerForm = {
  players: PlayerInput[];
};

export default function AddPlayerForm() {
  const router = useRouter();
  const { control, handleSubmit, reset } = useForm<TPlayerForm>({
    defaultValues: {
      players: [{ name: "", rating: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "players",
  });

  const client = useQueryClient();

  const onSubmit: SubmitHandler<TPlayerForm> = async (data) => {
    const response = await fetch("/api/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data.players),
    });

    if (response.ok) {
      client.invalidateQueries({ queryKey: ["playerList"] });
      reset({ players: [{ name: "", rating: 1 }] });
      router.refresh();
    } else {
      console.error("Failed to add players");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex space-x-2">
            <div className="flex">
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="px-2 py-1 bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  X
                </button>
              )}
              <Controller
                name={`players.${index}.name`}
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Player Name"
                    className="flex-grow text-black p-1"
                  />
                )}
              />
            </div>
            <Controller
              name={`players.${index}.rating`}
              control={control}
              render={({ field }) => (
                <RatingInput value={field.value} onChange={field.onChange} />
              )}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => append({ name: "", rating: 1 })}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        Add Player
      </button>
      <div className="flex justify-between">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Submit Players
        </button>
      </div>
    </form>
  );
}
