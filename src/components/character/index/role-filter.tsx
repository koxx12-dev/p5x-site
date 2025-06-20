import { ToggleGroup } from "@kobalte/core/toggle-group";
import { type Setter, For } from "solid-js";
import { RoleDisplay } from "../../role";
import type { Role } from "@types";

export function RoleFilter(props: { setValue: Setter<Role[]>; value: Role[] }) {
  const sectionRoles: Role[] = [
    "single",
    "multi",
    "buff",
    "debuff",
    "heal",
    "tank",
    "navi",
  ];

  return (
			<ToggleGroup
				class="flex w-max flex-shrink-0 flex-row gap-x-2 rounded-lg border-2 border-black bg-red-700 p-1 dark:border-red-600 dark:bg-black/60"
				multiple={true}
				value={props.value}
				onChange={props.setValue}
			>
				<For each={sectionRoles}>
					{(element) => (
						<ToggleGroup.Item
							value={element}
							aria-label={element}
							class="group relative"
						>
							<RoleDisplay
								characterRole={element}
								class="relative size-8 opacity-60 group-ui-pressed:opacity-100"
								loading="eager"
								width={32}
								height={32}
							/>
							<span
								class="-inset-1 -skew-12 absolute block bg-white opacity-0 mix-blend-difference transition-opacity duration-50 group-hover:opacity-100"
								aria-hidden="true"
							/>
						</ToggleGroup.Item>
					)}
				</For>
			</ToggleGroup>
		);
}