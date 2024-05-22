import { EchoDataTable } from '~/components/datatables/echoes/data-table';
import { UserDataTable } from '~/components/datatables/users/data-table';
import { PostDataTable } from '~/components/datatables/posts/data-table';
import { Echo, echoColumns } from '~/components/datatables/echoes/columns';
import { User, userColumns } from '~/components/datatables/users/columns';
import { Post, postColumns } from '~/components/datatables/posts/columns';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { DataTableSelector } from '~/components/datatables/datatable-selector';
import { useState } from 'react';
import { Card } from '~/components/ui/card';
import Error from 'next/error';
import { env } from '~/env';

export const getServerSideProps = (async () => {
	const echoesResponse = await fetch(`${process.env.API_URL}/api/get_echoes`);
	const userResponse = await fetch(`${process.env.API_URL}/api/get_users`);
	const postsResponse = await fetch(`${process.env.API_URL}/api/get_posts`);
	const errorCode =
		echoesResponse.ok && userResponse.ok && postsResponse.ok
			? false
			: echoesResponse.status;

	const users = await userResponse.json();
	const echoes = await echoesResponse.json();
	const posts = await postsResponse.json();
	return { props: { echoes, users, posts, errorCode } };
}) satisfies GetStaticProps<{
	echoes: Echo;
	users: User;
	posts: Post;
	errorCode: number | boolean;
}>;

export default function M2DemoPage({
	echoes,
	users,
	posts,
	errorCode,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
	const [dataTable, setDataTable] = useState('echoes');
	if (errorCode) {
		return <Error statusCode={errorCode} />;
	}

	const handleDataTableChange = (value: string) => {
		setDataTable(value);
	};

	return (
		<main className="p-24">
			<section className="container flex max-w-5xl flex-col items-center gap-4 text-center">
				<h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
					Milestone 2
				</h1>
				<p className="text-xl text-muted-foreground">
					This is our milestone 2 vertical prototype, meant to get our full
					stack application up and running. Select the different data tables
					from our database and test how our backend delivers it to our
					frontend.
				</p>
			</section>
			<Card className=" container mt-5 w-fit p-5">
				<DataTableSelector onValueChange={handleDataTableChange} />
				<div className="m-10">
					{dataTable === 'echoes' && (
						<EchoDataTable columns={echoColumns} data={echoes} />
					)}
					{dataTable === 'users' && (
						<UserDataTable columns={userColumns} data={users} />
					)}
					{dataTable === 'posts' && (
						<PostDataTable columns={postColumns} data={posts} />
					)}
				</div>
			</Card>
		</main>
	);
}
