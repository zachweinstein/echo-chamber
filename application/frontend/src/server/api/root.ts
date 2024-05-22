import { createTRPCRouter } from '~/server/api/trpc';
import { PostsRouter } from './router/posts';
import { EchoRouter } from './router/echo';
import { UserRouter } from './router/user';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	posts: PostsRouter,
	echo: EchoRouter,
	user: UserRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
