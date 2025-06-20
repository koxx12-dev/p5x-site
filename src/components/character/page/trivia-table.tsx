import { createMemo } from "solid-js";
import { Container } from "../../container";
import type { CharacterTrivia } from "@types";

export function TriviaTable(props: { trivia?: CharacterTrivia }) {
  const weight = createMemo(() => {
    const weight = props.trivia?.weight;
    if (weight === undefined) {
      return "???";
    }

    if (localStorage.getItem("unit") === "imperial") {
      const pounds = Math.floor(weight * 2.20462);
      return `${pounds} lbs`;
    }

    return `${weight} kg`;
  });

  const height = createMemo(() => {
    const height = props.trivia?.height;
    if (height === undefined) {
      return "???";
    }

    if (localStorage.getItem("unit") === "imperial") {
      const inches = Math.floor(height / 2.54);
      const feet = Math.floor(inches / 12);
      const remainingInches = inches % 12;
      return `${feet}' ${remainingInches}''`;
    }

    return `${height} cm`;
  });

  return (
    <Container
      header={
        <h1 class="font-semibold text-2xl text-white" id="trivia">
          Trivia
        </h1>
      }
      body={
      <div class="overflow-x-auto">
        <div class="grid-gap-2 grid min-w-[500px] grid-cols-2">
          <div class="flex items-center gap-2">
            <h2 class="w-26 font-normal text-white">Birthday</h2>
            <hr class="h-5 w-[2px] bg-black dark:bg-red-600" />
            <span class="font-normal text-white">
              {props.trivia?.b_day ?? "???"}
            </span>
          </div>
          <div class="flex w-full flex-row gap-2">
            <h2 class="w-26 font-normal text-white">Constellation</h2>
            <hr class="h-5 w-[2px] bg-black dark:bg-red-600" />
            <span class="font-normal text-white">
              {props.trivia?.constellation ?? "???"}
            </span>
          </div>
          <div class="flex w-full flex-row gap-2">
            <h2 class="w-26 font-normal text-white">Age</h2>
            <hr class="h-5 w-[2px] bg-black dark:bg-red-600" />
            <span class="font-normal text-white">
              {props.trivia?.age ?? "???"}
            </span>
          </div>
          <div class="flex w-full flex-row gap-2">
            <h2 class="w-26 font-normal text-white">Weight</h2>
            <hr class="h-5 w-[2px] bg-black dark:bg-red-600" />
            <span class="font-normal text-white">{weight()}</span>
          </div>
          <div class="flex w-full flex-row gap-2">
            <h2 class="w-26 font-normal text-white">Height</h2>
            <hr class="h-5 w-[2px] bg-black dark:bg-red-600" />
            <span class="font-normal text-white">{height()}</span>
          </div>
          <div class="flex w-full flex-row gap-2">
            <h2 class="w-26 font-normal text-white">Specialties</h2>
            <hr class="h-5 w-[2px] bg-black dark:bg-red-600" />
            <span class="font-normal text-white">
              {props.trivia?.specialties ?? "???"}
            </span>
          </div>
          <div class="flex w-full flex-row gap-2">
            <h2 class="w-26 font-normal text-white">Interests</h2>
            <hr class="h-5 w-[2px] bg-black dark:bg-red-600" />
            <span class="font-normal text-white">
              {props.trivia?.interests ?? "???"}
            </span>
          </div>
        </div>
      </div>
      }
    />
  );
}