import { defineCollection, defineConfig } from '@content-collections/core';
import { type } from 'arktype';
import { thief, thiefOverride } from './src/types';

const pathSeperator = process.platform === 'win32' ? '\\' : '/';

const thiefOverrides = defineCollection({
	name: 'thiefOverrides',
	directory: 'data/character',
	include: '*/override/*.json',
	parser: 'json',
	schema: thiefOverride,
	transform: (data) => {
		const id = data._meta.directory.split(pathSeperator)[0];
		const region = data._meta.fileName.replace(/\.json$/, '');

		if (id === undefined || region === undefined) {
			throw new Error(`Invalid thief override data: ${JSON.stringify(data)}`);
		}

		return {
			id,
			region,
			...data,
			...(data.awareness !== undefined &&
				data.awareness !== null && {
					awareness: data.awareness.map((a) => ({
						...a,
						name: a.name === undefined ? `awareness.${a.id}.name` : a.name,
						description:
							a.description === undefined
								? `awareness.${a.id}.description`
								: a.description,
					})),
				}),
			...(data.skill !== undefined &&
				data.skill !== null && {
					skill: data.skill.map((s) => ({
						...s,
						name: s.name === undefined ? `skill.${s.id}.name` : s.name,
						description:
							s.description === undefined
								? `skill.${s.id}.description`
								: s.description,
					})),
				}),
		};
	},
});

const dict = type.Record('string', 'string | string[]');

const thiefI18n = defineCollection({
	name: 'thiefI18n',
	directory: 'data/character',
	include: '*/i18n/*.json',
	parser: 'json',
	schema: dict,
	transform: (data) => {
		const id = data._meta.directory.split(pathSeperator)[0];
		const lang = data._meta.fileName.replace(/\.json$/, '');

		if (id === undefined || lang === undefined) {
			throw new Error(`Invalid thief override data: ${JSON.stringify(data)}`);
		}

		return {
			id,
			lang,
			...data,
		};
	},
});

const thieves = defineCollection({
	name: 'thieves',
	directory: 'data/character',
	include: '*/data.json',
	parser: 'json',
	schema: thief,
	transform: (data) => {
		if (data._meta.directory !== data.id) {
			throw new Error(
				`Thief ID mismatch: expected ${data._meta.directory}, got ${data.id}`,
			);
		}

		return {
			...data,
			code_name: data.code_name === undefined ? 'code_name' : data.code_name,
			full_name: data.full_name === undefined ? 'full_name' : data.full_name,
			awareness:
				data.awareness !== undefined
					? data.awareness.map((a) => ({
							...a,
							name: a.name === undefined ? `awareness.${a.id}.name` : a.name,
							description:
								a.description === undefined
									? `awareness.${a.id}.description`
									: a.description,
						}))
					: data.awareness,
			skill:
				data.skill !== undefined
					? data.skill.map((s) => ({
							...s,
							name: s.name === undefined ? `skill.${s.id}.name` : s.name,
							description:
								s.description === undefined
									? `skill.${s.id}.description`
									: s.description,
						}))
					: data.skill,
		};
	},
});

// console.log("dict", JSON.stringify(dict.toJsonSchema(), null, 2));
// console.log("thief", JSON.stringify(thief.toJsonSchema()));
// console.log("override", JSON.stringify(thiefOverride.toJsonSchema()));

export default defineConfig({
	collections: [thieves, thiefOverrides, thiefI18n],
});
