import { type } from "arktype";

export const awareness = type.enumerated("a1", "a2", "a3", "a4", "a5", "a6", "a7");
export type Awareness = typeof awareness.infer;

export type MentalImageAsset = typeof mentalImageAsset.infer;
export const mentalImageAsset = type.enumerated(
    "almighty",
    "atk_prec",
    "atk",
    "bells",
    "bless",
    "crit_c_prec",
    "crit_dmg_prec",
    "curse",
    "def_prec",
    "def",
    "dmg_prec",
    "dmg_res_prec",
    "eff_hit_prec",
    "eff_res_prec",
    "elec",
    "fire",
    "gun",
    "hp_prec",
    "hp",
    "ice",
    "nuke",
    "pen_prec",
    "phys",
    "support",
    "wind_ice",
    "wind",
    "heal_eff_prec",
    "spd",
    "sp_rec_prec",
    "shd_eff_prec"
);

export type Element = typeof element.infer;
export const element = type.enumerated(
    // p5
    "physical",
    "gun",
    "fire",
    "ice",
    "elec",
    "wind",
    "psy",
    "nuke",
    "bless",
    "curse",
    "almighty",
    "almighty_alt",
    "ailment",
    "support",
    "healing",
    "passive",
    // p5x all
    "all_physical",
    "all_gun",
    "all_fire",
    "all_ice",
    "all_elec",
    "all_wind",
    "all_psy",
    "all_nuke",
    "all_bless",
    "all_curse",
    "all_almighty",
    "all_almighty_alt",
    "all_ailment",
    "all_support",
    "all_healing",
    "all_passive",
    // p5x multi
    "wind_ice",
    "wind_all_ice",
    "all_wind_ice",
    "all_wind_all_ice"
);

export const role = type.enumerated("single", "multi", "heal", "buff", "debuff", "tank", "navi");
export type Role = typeof role.infer;

export type StubCharacter = typeof stubCharacter.infer;
export const stubCharacter = type({
    id: "string",
});

export type CharacterAwareness = typeof characterAwareness.infer;
export const characterAwareness = type({
    id: "string",
    tier: "0 <= number <= 7",
    name: "string",
    description: "string | string[]",
});

export type CharacterSkillData = typeof characterSkillData.infer;
export const characterSkillData = type("(string | string[])")

export type CharacterSkill = typeof characterSkill.infer;
export const characterSkill = type({
    id: "string",
    element: element,
    name: "string",
    description: "string | string[]",
    data: characterSkillData.array().array().optional(),
});

export type CharacterTrivia = typeof characterTrivia.infer;
export const characterTrivia = type({
    b_day: "string",
    constellation: "string",
    age: "number",
    height: "number",
    weight: "number",
    interests: "string",
    specialties: "string",
});

export type FullCharacter = typeof fullCharacter.infer;
export const mentalImageBuff = type({
    type: "'atk_prec' | 'def_prec' | 'hp_prec' | 'dmg_prec' | 'dmg_res_prec' | 'eff_hit_prec' | 'eff_res_prec' | 'crit_dmg_prec' | 'crit_c_prec' | 'pen_prec' | 'heal_eff_prec' | 'spd' | 'sp_rec_prec' | 'shd_eff_prec'",
    values: "string[]",
});

export type MentalImageBuff = typeof mentalImageBuff.infer;
export const mentalImageBasic = type({
    type: "'atk' | 'def' | 'hp'",
    value: "string",
});

export type MentalImageBasic = typeof mentalImageBasic.infer;
export const mentalImageBells = type({
    atk: 'string?',
    def: 'string?',
    hp: 'string?',
});

export type MentalImageBells = typeof mentalImageBells.infer;
export const characterMentalImage = type({
    basic: mentalImageBasic.array(),
    bells: mentalImageBells.array(),
    stat_buff_1: mentalImageBuff,
    stat_buff_2: mentalImageBuff,
});

export type CharacterMentalImage = typeof characterMentalImage.infer;

export const characterStatEntry = type.Record("string", "string");
export const characterStats = type.Record("string", characterStatEntry).array();

export type CharacterStatEntry = typeof characterStatEntry.infer;
export type CharacterStats = typeof characterStats.infer;

export const fullCharacter = type({
    id: "string",
    quality: "4 | 5",
    code_name: "string",
    full_name: "string",
    role: role,
    element: element,
    skill: characterSkill.array().optional(),
    awareness: characterAwareness.array().optional(),
    mental_image: characterMentalImage.optional(),
    stats: characterStats.optional(),
    extra: type.Record("string", "string | string[]").optional(),
});