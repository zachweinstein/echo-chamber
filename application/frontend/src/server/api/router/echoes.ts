import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const EchoesRouter = createTRPCRouter({
	getEcho: protectedProcedure
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
});
