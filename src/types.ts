import { type } from 'arktype';

type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export const region = type.enumerated('cn', 'kr-tw', 'glb-jp', 'sea');
export type Region = typeof region.infer;

export const language = type.enumerated('en');
export type Language = typeof language.infer;

export const awareness = type.enumerated(
	'a1',
	'a2',
	'a3',
	'a4',
	'a5',
	'a6',
	'a7',
);
export type Awareness = typeof awareness.infer;

export type MentalImageAsset = typeof mentalImageAsset.infer;
export const mentalImageAsset = type.enumerated(
	'almighty',
	'atk_prec',
	'atk',
	'bells',
	'bless',
	'crit_c_prec',
	'crit_dmg_prec',
	'curse',
	'def_prec',
	'def',
	'dmg_prec',
	'dmg_res_prec',
	'eff_hit_prec',
	'eff_res_prec',
	'elec',
	'fire',
	'gun',
	'hp_prec',
	'hp',
	'ice',
	'nuke',
	'pen_prec',
	'phys',
	'support',
	'wind_ice',
	'wind',
	'heal_eff_prec',
	'spd',
	'sp_rec_prec',
	'shd_eff_prec',
);

export type Element = typeof element.infer;
export const element = type.enumerated(
	// p5
	'physical',
	'gun',
	'fire',
	'ice',
	'elec',
	'wind',
	'psy',
	'nuke',
	'bless',
	'curse',
	'almighty',
	'almighty_alt',
	'ailment',
	'support',
	'healing',
	'passive',
	// p5x all
	'all_physical',
	'all_gun',
	'all_fire',
	'all_ice',
	'all_elec',
	'all_wind',
	'all_psy',
	'all_nuke',
	'all_bless',
	'all_curse',
	'all_almighty',
	'all_almighty_alt',
	'all_ailment',
	'all_support',
	'all_healing',
	'all_passive',
	// p5x multi
	'wind_ice',
	'wind_all_ice',
	'all_wind_ice',
	'all_wind_all_ice',
);

export const role = type.enumerated(
	'single',
	'multi',
	'heal',
	'buff',
	'debuff',
	'tank',
	'navi',
);
export type Role = typeof role.infer;

export type RequiredThiefAwareness = RequiredFields<
	typeof thiefAwareness.infer,
	'name' | 'description'
>;
export type ThiefAwareness = typeof thiefAwareness.infer;
export const thiefAwareness = type({
	id: 'string',
	tier: '0 <= number <= 7',
	name: 'string?',
	description: '(string | string[])?',
});

export type ThiefSkillData = typeof thiefSkillData.infer;
export const thiefSkillData = type('(string | string[])');

export type RequiredThiefSkill = RequiredFields<
	typeof thiefSkill.infer,
	'name' | 'description'
>;
export type ThiefSkill = typeof thiefSkill.infer;
export const thiefSkill = type({
	id: 'string',
	element: element,
	name: 'string?',
	description: '(string | string[])?',
	data: thiefSkillData.array().array().optional(),
});

// export type thiefTrivia = typeof thiefTrivia.infer;
// export const thiefTrivia = type({
//     b_day: "string",
//     constellation: "string",
//     age: "number",
//     height: "number",
//     weight: "number",
//     interests: "string",
//     specialties: "string",
// });

export type RequiredThief = RequiredFields<
	typeof thief.infer,
	'code_name' | 'full_name'
> & {
	skill?: RequiredThiefSkill[];
	awareness?: RequiredThiefAwareness[];
};
export type SchemaThief = typeof thief.infer;
export const mentalImageBuff = type({
	type: "'atk_prec' | 'def_prec' | 'hp_prec' | 'dmg_prec' | 'dmg_res_prec' | 'eff_hit_prec' | 'eff_res_prec' | 'crit_dmg_prec' | 'crit_c_prec' | 'pen_prec' | 'heal_eff_prec' | 'spd' | 'sp_rec_prec' | 'shd_eff_prec'",
	values: 'string[]',
});

export type MentalImageBuff = typeof mentalImageBuff.infer;
export const mentalImageBasic = type({
	type: "'atk' | 'def' | 'hp'",
	value: 'string',
});

export type MentalImageBasic = typeof mentalImageBasic.infer;
export const mentalImageBells = type({
	atk: 'string?',
	def: 'string?',
	hp: 'string?',
});

export type MentalImageBells = typeof mentalImageBells.infer;
export const thiefMentalImage = type({
	basic: mentalImageBasic.array(),
	bells: mentalImageBells.array(),
	stat_buff_1: mentalImageBuff,
	stat_buff_2: mentalImageBuff,
});

export type ThiefMentalImage = typeof thiefMentalImage.infer;

export const thiefStatEntry = type.Record('string', 'string');
export const thiefStats = type.Record('string', thiefStatEntry).array();

export type ThiefStatEntry = typeof thiefStatEntry.infer;
export type ThiefStats = typeof thiefStats.infer;

export const thief = type({
	id: 'string',
	quality: '4 | 5',
	code_name: 'string?',
	full_name: 'string?',
	role: role,
	element: element,
	skill: thiefSkill.array().optional(),
	awareness: thiefAwareness.array().optional(),
	mental_image: thiefMentalImage.optional(),
	stats: thiefStats.optional(),
	extra: type.Record('string', 'string | string[]').optional(),
	available_regions: region.array().optional(),
});

export const thiefOverride = type({
	code_name: 'string | null',
	full_name: 'string | null',
	role: role.or('null'),
	element: element.or('null'),
	skill: thiefSkill.array().or('null').optional(),
	awareness: thiefAwareness.array().or('null').optional(),
	mental_image: thiefMentalImage.or('null').optional(),
	stats: thiefStats.or('null').optional(),
	extra: type.Record('string', 'string | string[]').or('null').optional(),
	available_regions: region.array().or('null').optional(),
}).partial();
