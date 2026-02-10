# Blog System

This blog system automatically generates blog posts from Markdown files with support for code highlighting and Mermaid diagrams.

## Adding a New Blog Post

Follow these simple steps to add a new blog post:

### 1. Create Your Markdown File

Create a new `.md` file in the `public/markdown/` directory with your content.

**File naming convention**: Use kebab-case (lowercase with hyphens) for the filename.
Example: `my-awesome-post.md`

### 2. Add Frontmatter

Every blog post must start with frontmatter metadata at the top:

```markdown
---
title: Your Post Title
description: A brief description of your post
cover: image-filename.png
---

Your content starts here...
```

**Frontmatter fields**:

- `title` (required): The title of your blog post
- `description` (required): A short description shown in the blog listing
- `cover` (optional): Cover image filename (place the image in `public/post_images/`)

### 3. Add Images

If your post includes images:

1. Place all images in the `public/post_images/` directory
2. Reference them in markdown using: `![Alt text](/post_images/your-image.png)`

### 4. Use Mermaid Diagrams

You can include Mermaid diagrams using code blocks:

\`\`\`mermaid
graph LR
A[Start] --> B[Process]
B --> C[End]
\`\`\`

### 5. Code Highlighting

Code blocks are automatically highlighted. Just use standard markdown code blocks:

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

### 6. Build the Site

After adding your markdown file and images:

```bash
npm run build
```

The blog system will automatically:

- Parse your markdown file
- Extract metadata
- Generate a static HTML page
- Create a listing entry on the blog page

## Blog Structure

```
public/
├── markdown/           # Place your .md files here
│   ├── my-post.md
│   └── another-post.md
└── post_images/        # Place your images here
    ├── cover.png
    └── diagram.png
```

## Internal Links

To link to other blog posts, use: `/blog/post-slug`

Example: `[Read my other post](/blog/introduction-to-docker)`

## Features

- ✅ Static Site Generation (SSG) - Fully pre-rendered HTML
- ✅ Code syntax highlighting (supports all major languages)
- ✅ Mermaid diagram support
- ✅ Responsive images
- ✅ Dark theme optimized
- ✅ Automatic metadata extraction
- ✅ SEO-friendly

## Supported Markdown Features

- Headers (H1-H6)
- Bold, italic, strikethrough
- Lists (ordered and unordered)
- Links and images
- Code blocks with syntax highlighting
- Blockquotes
- Tables (GitHub Flavored Markdown)
- Task lists
- Mermaid diagrams

## Example Blog Post

```markdown
---
title: Getting Started with Next.js
description: Learn how to build modern web applications with Next.js
cover: nextjs-cover.png
---

Next.js is a powerful React framework that makes building web applications easy.

## Why Next.js?

Here are some key benefits:

1. Server-side rendering
2. Static site generation
3. API routes
4. Great developer experience

## Code Example

\`\`\`typescript
export default function Home() {
return <h1>Hello, Next.js!</h1>;
}
\`\`\`

![Next.js Architecture](/post_images/nextjs-architecture.png)
```

That's it! Your blog post will automatically appear on the `/blog` page after building.
