/**
 * File: column.tsx
 *
 * Description: Column definitions for the Posts data table component.
 * These definitions should match in name and type to the columns in our
 * database.
 */

import { ColumnDef } from '@tanstack/react-table';

export type Post = {
	echo_echo_id: number;
	karma: number;
	message: string;
	post_id: number;
};

export const postColumns: ColumnDef<Post>[] = [
	{
		accessorKey: 'post_id',
		header: 'Post ID',
	},
	{
		accessorKey: 'echo_echo_id',
		header: 'Echo ID',
	},
	{
		accessorKey: 'message',
		header: 'Content',
	},
	{
		accessorKey: 'karma',
		header: 'Karma',
	},
];
