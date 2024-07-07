import { z } from "zod";

export const PokemonTypeSchema = z.object({
  type: z.object({
    name: z.string(),
  }),
});

export const PokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  types: z.array(PokemonTypeSchema),
  sprites: z.object({ front_default: z.string() }),
});

export const PokemonListSchema = z.array(
  z.object({
    url: z.string().url(),
  })
);
