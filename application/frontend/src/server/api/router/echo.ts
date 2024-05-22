import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const EchoRouter = createTRPCRouter({
	getEchoById: protectedProcedure
		.input(z.number())
		.query(async ({ ctx, input }) => {
			try {
				const echo = await ctx.db.echo.findFirst({
					where: {
						id: input,
					},
				});
				return echo;
			} catch (error) {
				console.log(error);
			}
		}),
	getEchoesByOwnerId: protectedProcedure
		.input(z.string())
		.query(async ({ ctx, input }) => {
			try {
				const echoes = await ctx.db.echo.findMany({
					where: {
						user_id: input,
					},
				});

				return echoes;
			} catch (error) {
				console.log(error);
			}
		}),
	createEcho: protectedProcedure
		.input(
			z.object({
				name: z.string(),
				bio: z.string(),
				owned: z.number(),
				platform: z.string(),
				user_id: z.string(),
				api_key: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			try {
				await ctx.db.echo.create({
					data: {
						name: input.name,
						bio: input.bio,
						owned: 1,
						platform: input.platform,
						user_id: input.user_id,
						api_key: input.api_key,
					},
				});
			} catch (error) {
				console.log(error);
			}
		}),
	updateEcho: protectedProcedure
		.input(
			z.object({
				name: z.string(),
				bio: z.string(),
				owned: z.number(),
				platform: z.string(),
				user_id: z.string(),
				api_key: z.string(),
				echo_id: z.number(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			try {
				await ctx.db.echo.update({
					where: { id: input.echo_id },
					data: {
						name: input.name,
						bio: input.bio,
						owned: 1,
						platform: input.platform,
						user_id: input.user_id,
						api_key: input.api_key,
					},
				});
			} catch (error) {
				console.log(error);
			}
		}),
});
