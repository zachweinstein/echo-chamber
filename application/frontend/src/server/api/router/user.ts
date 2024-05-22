import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const UserRouter = createTRPCRouter({
	getSessionToken: protectedProcedure
		.input(z.string())
		.query(async ({ ctx, input }) => {
			try {
				const sessionToken = await ctx.db.session.findFirst({
					where: {
						userId: input,
					},
				});
				return sessionToken;
			} catch (error) {
				console.log(error);
			}
		}),
});
