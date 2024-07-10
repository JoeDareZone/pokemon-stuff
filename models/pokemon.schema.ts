import { z } from "zod";

export const pokemonTypeSchema = z.object({
  type: z.object({
    name: z.string(),
  }),
});

export const pokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  types: z.array(pokemonTypeSchema),
  sprites: z.object({
    front_default: z.string(),
  }),
});

export const pokemonListSchema = z.array(
  z.object({
    name: z.string(),
    url: z.string().url(),
  })
);
