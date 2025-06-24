import { defineCollection, defineConfig } from "@content-collections/core";
import { thief, thiefOverride } from "./src/types";

const thiefOverrides = defineCollection({
    name: "thiefOverrides",
    directory: "data/character",
    include: "*/override/*.json",
    parser: "json",
    schema: thiefOverride,
    transform: (data) => {
        const id = data._meta.directory.split("\\")[0] || data._meta.directory.split("/")[0];
        const region = data._meta.fileName.replace(/\.json$/, "");

        if (id === undefined || region === undefined) {
            throw new Error(`Invalid thief override data: ${JSON.stringify(data)}`);
        }

        return {
            id,
            region,
            ...data,
        }
    }
})

const thieves = defineCollection({
    name: "thieves",
    directory: "data/character",
    include: "*/data.json",
    parser: "json",
    schema: thief,
    transform: (data) => {
        if (data._meta.directory !== data.id) {
            throw new Error(`Thief ID mismatch: expected ${data._meta.directory}, got ${data.id}`);
        }

        return data;
    }
});

// console.log("thief", JSON.stringify(fullCharacter.toJsonSchema()));
// console.log("override", JSON.stringify(thiefOverride.toJsonSchema()));

export default defineConfig({
    collections: [thieves, thiefOverrides],
});