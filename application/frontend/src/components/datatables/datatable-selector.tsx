/**
 * File: datatable-selector.tsx
 *
 * Description: The selector component used to select between the
 * data tables needed for milestone 2.
 */

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '~/components/ui/select';

const allTables = [
	{
		value: 'users',
		label: 'Users',
	},
	{
		value: 'echoes',
		label: 'Echoes',
	},
	{
		value: 'posts',
		label: 'Posts',
	},
];

interface DataTableSelectorProps {
	onValueChange: (value: string) => void;
}

export function DataTableSelector({ onValueChange }: DataTableSelectorProps) {
	const handleDataTableChange = (value: string) => {
		onValueChange(value);
	};
	return (
		<Select onValueChange={handleDataTableChange} defaultValue="echoes">
			<SelectTrigger
				className={'h-7 w-[160px] text-xs [&_svg]:h-4 [&_svg]:w-4'}
			>
				<span className="text-muted-foreground">Data Table: </span>
				<SelectValue placeholder="Select style" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{allTables.map((dbTable) => (
						<SelectItem key={dbTable.value} value={dbTable.value}>
							{dbTable.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
