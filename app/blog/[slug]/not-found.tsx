import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
	return (
		<div className='flex min-h-screen items-center justify-center font-sans bg-neutral-900'>
			<main className='relative flex min-h-screen w-full max-w-6xl flex-col items-center justify-center xl:mt-8 xl:mb-8 xl:rounded-2xl bg-neutral-950 shadow-2xl shadow-neutral-950'>
				<div className='text-center px-8'>
					<h1 className='text-6xl font-bold text-white mb-4'>404</h1>
					<h2 className='text-2xl font-bold text-amber-500 mb-4'>
						Blog Post Not Found
					</h2>
					<p className='text-neutral-400 mb-8'>
						The blog post you're looking for doesn't exist.
					</p>
					<Link
						href='/blog'
						className='inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-amber-500/30'
					>
						<ArrowRight className='w-4 h-4 rotate-180' />
						Back to Blog
					</Link>
				</div>
			</main>
		</div>
	);
}
