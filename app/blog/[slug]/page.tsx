import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import MarkdownRenderer from "@/app/components/MarkdownRenderer";
import { ArrowRight, Calendar } from "lucide-react";

interface BlogPostPageProps {
	params: Promise<{
		slug: string;
	}>;
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
	const slugs = getAllPostSlugs();
	return slugs.map((slug) => ({
		slug,
	}));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps) {
	const { slug } = await params;
	try {
		const post = getPostBySlug(slug);
		return {
			title: `${post.title} - Emir Kaan Özver`,
			description: post.description,
		};
	} catch {
		return {
			title: "Post Not Found",
		};
	}
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params;

	let post;
	try {
		post = getPostBySlug(slug);
	} catch {
		notFound();
	}

	const formattedDate = post.date
		? new Date(post.date).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			})
		: null;

	return (
		<div className='flex min-h-screen items-center justify-center font-sans bg-neutral-900'>
			<main className='relative flex min-h-screen w-full max-w-6xl flex-col items-center xl:mt-8 xl:mb-8 xl:rounded-2xl bg-neutral-950 shadow-2xl shadow-neutral-950 overflow-hidden'>
				<article className='w-full px-8 sm:px-16 py-20 lg:py-28'>
					{/* Navigation */}
					<Link
						href='/blog'
						className='inline-flex items-center text-amber-500 hover:text-amber-400 transition-colors mb-8'
					>
						<ArrowRight className='w-4 h-4 mr-2 rotate-180' />
						Back to Blog
					</Link>

					{/* Cover Image */}
					{post.cover && (
						<div className='w-full aspect-video rounded-lg overflow-hidden mb-8 border border-neutral-800'>
							<img
								src={`/post_images/${post.cover}`}
								alt={post.title}
								className='w-full h-full object-cover'
							/>
						</div>
					)}

					{/* Header */}
					<header className='mb-12'>
						<h1 className='text-4xl lg:text-5xl font-bold text-white mb-4'>
							{post.title}
						</h1>
						{post.description && (
							<p className='text-xl text-neutral-400 mb-4'>
								{post.description}
							</p>
						)}
						{formattedDate && (
							<div className='flex items-center text-neutral-500'>
								<Calendar className='w-4 h-4 mr-2' />
								<time dateTime={post.date}>{formattedDate}</time>
							</div>
						)}
					</header>

					{/* Content */}
					<MarkdownRenderer content={post.content} />

					{/* Footer Navigation */}
					<div className='mt-16 pt-8 border-t border-neutral-800'>
						<Link
							href='/blog'
							className='inline-flex items-center text-amber-500 hover:text-amber-400 transition-colors font-semibold'
						>
							<ArrowRight className='w-4 h-4 mr-2 rotate-180' />
							Back to all posts
						</Link>
					</div>
				</article>
			</main>
		</div>
	);
}
