/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
	plugins: ['prettier-plugin-tailwindcss'],
	semi: true,
	useTabs: true,
	singleQuote: true,
	trailingComma: 'es5',
};

export default config;
