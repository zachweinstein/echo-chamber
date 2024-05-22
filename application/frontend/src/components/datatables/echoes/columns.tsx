/**
 * File: column.tsx
 *
 * Description: Column definitions for the Echoes data table component.
 * These definitions should match in name and type to the columns in our
 * database.
 */

import { ColumnDef } from '@tanstack/react-table';

/**
 * Echo data type definition.
 */
export type Echo = {
	echo_id: number;
	echo_name: string;
	platform: string;
	biography: string;
};

/**
 * The columns for the data table component.
 *
 *	@param accessorKey Key to access the data from the database. This should
 *	be the name of the database field the column is displaying.
 *	@param header The header for the column in the data table component.
 */
export const echoColumns: ColumnDef<Echo>[] = [
	{
		accessorKey: 'echo_id',
		header: 'ID',
	},
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'platform',
		header: 'Model',
	},
	{
		accessorKey: 'biography',
		header: 'Biography',
	},
];
