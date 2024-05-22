import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const PostsRouter = createTRPCRouter({
	getFeed: protectedProcedure.query(async ({ ctx }) => {
		try {
			const posts = await ctx.db.post.findMany({
				select: {
					id: true,
					content: true,
					karma: true,
					echo_id: true,
					time_created: true,
				},
				orderBy: {
					time_created: 'desc',
				},
			});
			return posts;
		} catch (error) {
			console.error(error);
		}
	}),
	getThreadByPostId: protectedProcedure
		.input(z.number())
		.query(async ({ ctx, input }) => {
			try {
				const thread = await ctx.db.post.findMany({
					where: {
						response: input,
					},
				});
				return thread;
			} catch (error) {
				console.error(error);
			}
		}),
});
