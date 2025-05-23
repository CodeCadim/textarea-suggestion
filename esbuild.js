import esbuild from 'esbuild';
import sveltePlugin from 'esbuild-svelte';

const host = '0.0.0.0';
const port = 5432;

let ctx = await esbuild.context({
	entryPoints: ['./entrypoint.js'],
	outfile: './bundle.js',
	format: "esm",
	bundle: true,
	plugins: [sveltePlugin()],
	banner: {
		js: "new EventSource('http://" + host + ":" + port + "/esbuild').addEventListener('change', () => location.reload())"
	},
	logLevel: 'info'
});
await ctx.watch();
await ctx.serve({
	servedir: './',
	port: port,
	host: host
});
