import { ImageGallery } from '@/curated/image-gallery'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/gallery')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ImageGallery />
}
