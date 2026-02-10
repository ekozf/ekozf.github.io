import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { ArrowRight } from "lucide-react";

export const metadata = {
	title: "Blog - Emir Kaan Özver",
	description:
		"Technical articles and tutorials about software development, Docker, web technologies, and more.",
};

export default function BlogPage() {
	const posts = getAllPosts();

	return (
		<div className='flex min-h-screen items-center justify-center font-sans bg-neutral-900'>
			<main className='relative flex min-h-screen w-full max-w-6xl flex-col items-center xl:mt-8 xl:mb-8 xl:rounded-2xl bg-neutral-950 shadow-2xl shadow-neutral-950 overflow-hidden'>
				<div className='w-full px-8 sm:px-16 py-20 lg:py-28'>
					{/* Header */}
					<div className='mb-16'>
						<Link
							href='/'
							className='inline-flex items-center text-amber-500 hover:text-amber-400 transition-colors mb-8'
						>
							<ArrowRight className='w-4 h-4 mr-2 rotate-180' />
							Back to Home
						</Link>
						<h1 className='text-5xl lg:text-6xl font-bold text-white mb-4'>
							Blog
						</h1>
						<p className='text-xl text-neutral-400'>
							Technical articles and tutorials about software development
						</p>
					</div>

					{/* Blog Posts Grid */}
					<div className='grid gap-8 md:grid-cols-2'>
						{posts.map((post) => (
							<Link
								key={post.slug}
								href={`/blog/${post.slug}`}
								className='group block bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 hover:border-amber-500 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10'
							>
								{post.cover && (
									<div className='aspect-video w-full overflow-hidden bg-neutral-800'>
										<img
											src={`/post_images/${post.cover}`}
											alt={post.title}
											className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
										/>
									</div>
								)}
								<div className='p-6'>
									<h2 className='text-2xl font-bold text-white mb-3 group-hover:text-amber-500 transition-colors'>
										{post.title}
									</h2>
									<p className='text-neutral-400 mb-4 line-clamp-3'>
										{post.description}
									</p>
									<div className='flex items-center text-amber-500 font-semibold'>
										Read more
										<ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
									</div>
								</div>
							</Link>
						))}
					</div>

					{posts.length === 0 && (
						<div className='text-center py-20'>
							<p className='text-neutral-500 text-lg'>
								No blog posts yet. Check back soon!
							</p>
						</div>
					)}
				</div>
			</main>
		</div>
	);
}
