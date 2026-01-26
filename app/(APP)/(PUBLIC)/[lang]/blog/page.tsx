import { PageWrapper } from "@/components/layout"
import PageHero from "@/components/ui/page-hero"
import { getBlogPageContent } from "@/helpers/blog-page-content.helpers"
import BlogMainContent from "@/components/sections/blog/BlogMainContent"
import PageCTA from "@/components/sections/shared/PageCTA"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Journal"
}

type Props = {
  params: Promise<LanguageType>
}

const Blog = async ({ params }: Props) => {
  const { lang } = await params
  const pageContent = await getBlogPageContent(lang)

  if (!pageContent) {
    return null
  }
  

  return (
    <PageWrapper>
      <PageHero
        title={pageContent.hero.title}
        subtitle={pageContent.hero.subtitle}
        description={pageContent.hero.description}
        breadcrumbs={[{ label: "Blog" }]}
      />

      <BlogMainContent posts={pageContent.blogList.posts} />

      <PageCTA cta={pageContent.cta} />
    </PageWrapper>
  )
}

export default Blog
