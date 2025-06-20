import { For } from "solid-js";
import { CharacterSkillComponent } from "./character-skill-component";
import type { CharacterSkill } from "@types";

export function CharacterSkillDisplay(props: { skill: CharacterSkill[] }) {
  return (
    <div class="mt-5 flex w-full flex-col gap-2">
      <h3 class="font-semibold text-4xl text-white" id="skills">
        Skills
      </h3>
      <For each={props.skill}>
        {(skill) => <CharacterSkillComponent skill={skill} />}
      </For>
    </div>
  );
}