/**
 * File: column.tsx
 *
 * Description: Column definitions for the Users data table component.
 * These definitions should match in name and type to the columns in our
 * database.
 */

import { ColumnDef } from '@tanstack/react-table';

export type User = {
	id: number;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
};

export const userColumns: ColumnDef<User>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
	},
	{
		accessorKey: 'username',
		header: 'Username',
	},
	{
		accessorKey: 'first_name',
		header: 'First Name',
	},
	{
		accessorKey: 'last_name',
		header: 'Last Name',
	},
];
