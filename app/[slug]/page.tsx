import { Metadata } from 'next'
import { projects } from '@/data/projects'
import ProjectDetailClient from '@/components/ProjectDetailClient';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const project = projects.find(p => p.slug === params.slug)

    if (!project) {
        return {
            title: 'Project Not Found',
        }
    }

    return {
        title: `${project.name} | Vetri Reals`,
        description: project.description,
        openGraph: {
            title: project.name,
            description: project.description,
            images: [`/project_scrolling/${project.image}`],
        },
    }
}

export default function ProjectPage() {
    return <ProjectDetailClient />
}
