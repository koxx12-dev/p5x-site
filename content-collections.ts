import { defineCollection, defineConfig } from "@content-collections/core";
import { fullCharacter } from "./src/types";

const thieves = defineCollection({
    name: "thieves",
    directory: "data/character",
    include: "*/data.json",
    parser: "json",
    schema: fullCharacter,
});

export default defineConfig({
    collections: [thieves],
});