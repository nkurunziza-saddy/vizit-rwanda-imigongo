'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { galleryImages } from '@/lib/data';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type CategoryType = 'all' | 'mountains' | 'wildlife' | 'landscapes' | 'cities' | 'nature';

export default function GalleryPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories: { value: CategoryType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'mountains', label: 'Mountains' },
    { value: 'wildlife', label: 'Wildlife' },
    { value: 'landscapes', label: 'Landscapes' },
    { value: 'cities', label: 'Cities' },
    { value: 'nature', label: 'Nature' },
  ];

  const filteredImages =
    selectedCategory === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.hero-bg', {
        yPercent: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      gsap.from('.gallery-item', {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.utils.toArray<HTMLElement>('.gallery-item').forEach((item) => {
        const img = item.querySelector('img');
        if (img) {
          item.addEventListener('mouseenter', () => {
            gsap.to(img, { scale: 1.05, duration: 0.3 });
          });
          item.addEventListener('mouseleave', () => {
            gsap.to(img, { scale: 1, duration: 0.3 });
          });
        }
      });
    });

    return () => ctx.revert();
  }, [selectedCategory]);

  const handleNextImage = () => {
    if (selectedImage) {
      const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id);
      const nextIndex = (currentIndex + 1) % filteredImages.length;
      setSelectedImage(filteredImages[nextIndex]);
      setLightboxIndex(nextIndex);
    }
  };

  const handlePrevImage = () => {
    if (selectedImage) {
      const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id);
      const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
      setSelectedImage(filteredImages[prevIndex]);
      setLightboxIndex(prevIndex);
    }
  };

  return (
    <main className="bg-background min-h-screen">
      <Navigation />

      <section ref={heroRef} className="relative pt-32 pb-0 h-[600px] md:h-[700px] flex items-end overflow-hidden">
        <div className="hero-bg absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=1200&fit=crop"
            alt="Rwanda Landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16 w-full">
          <h1 className="font-display text-6xl md:text-7xl text-background mb-4 leading-tight">
            Rwanda Through the Lens
          </h1>
          <p className="text-background/90 text-lg md:text-xl max-w-2xl leading-relaxed">
            Explore the breathtaking landscapes, vibrant cultures, and pristine natural
            wonders of the Land of a Thousand Hills
          </p>
        </div>
      </section>

      <section className="sticky top-20 z-40 bg-background/95 backdrop-blur-md border-b border-border py-4 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat.value)}
                className={`rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-primary text-primary-foreground'
                    : 'border-border text-foreground hover:bg-muted'
                }`}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section ref={galleryRef} className="py-16 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]">
              {filteredImages.map((image, idx) => (
                <div
                  key={image.id}
                  className="gallery-item group relative rounded-sm overflow-hidden cursor-pointer bg-muted"
                  onClick={() => {
                    setSelectedImage(image);
                    setLightboxIndex(idx);
                  }}
                >
                  <Image
                    src={image.image || "/placeholder.svg"}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                    <div className="flex justify-end">
                      <div className="bg-background/80 backdrop-blur p-2 rounded-sm">
                        <ZoomIn className="w-5 h-5 text-foreground" />
                      </div>
                    </div>
                    <div>
                      <Badge className="bg-primary text-primary-foreground rounded-sm text-xs mb-3 capitalize">
                        {image.category}
                      </Badge>
                      <h3 className="font-serif text-lg text-background font-semibold mb-2">
                        {image.title}
                      </h3>
                      <p className="text-background/90 text-sm leading-relaxed">
                        {image.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No images found in this category
              </p>
            </div>
          )}
        </div>
      </section>

      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 z-10 bg-background/80 hover:bg-background p-2 rounded-sm transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>

          <div className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center">
            <Image
              src={selectedImage.image || "/placeholder.svg"}
              alt={selectedImage.title}
              fill
              className="object-contain"
              priority
            />

            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-3 rounded-sm transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-3 rounded-sm transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
              <h2 className="font-serif text-3xl text-background font-semibold mb-2">
                {selectedImage.title}
              </h2>
              <p className="text-background/90 text-base mb-4">
                {selectedImage.description}
              </p>
              <Badge className="bg-primary text-primary-foreground rounded-sm capitalize">
                {selectedImage.category}
              </Badge>
              <p className="text-background/70 text-sm mt-4">
                {lightboxIndex + 1} of {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}

      <section className="py-20 px-6 bg-secondary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-8">
            Discover Rwanda's Beauty
          </h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              From the misty peaks of Volcanoes National Park to the serene shores of
              Lake Kivu, Rwanda's landscapes are as diverse as they are breathtaking.
            </p>
            <p>
              Our gallery captures the essence of the Land of a Thousand Hills - a nation
              transformed by resilience, nature's splendor, and the warmth of its people.
            </p>
            <p>
              Every image tells a story. Every view invites you to experience Rwanda's
              authentic magic for yourself.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
