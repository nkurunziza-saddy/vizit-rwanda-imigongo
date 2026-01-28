import { LazyImage } from "@/components/lazy-image";

const galleryImages = [
	{
		id: "1493246507139-91e8fad9978e",
		alt: "Mountain landscape with mist",
		name: "Serene Highlands",
		ratio: 16 / 9,
	},
	{
		id: "1516426122078-c23e76319801",
		alt: "Safari jeep in the savannah",
		name: "Safari Adventure",
		ratio: 4 / 3,
	},
	{
		id: "1523805009345-7448845a9e53",
		alt: "Lush green nature",
		name: "Nature's Embrace",
		ratio: 3 / 4,
	},
	{
		id: "1547471080-7cc2caa01a7e",
		alt: "Sunset over the plains",
		name: "Golden Sunset",
		ratio: 16 / 9,
	},
	{
		id: "1549396535-c11d5c55b9df",
		alt: "Modern minimalist interior",
		name: "Modern Living",
		ratio: 3 / 4,
	},
	{
		id: "1501594909351-23b775645395",
		alt: "Wildlife in natural habitat",
		name: "Wildlife Encounter",
		ratio: 4 / 3,
	},
	{
		id: "1548592734-372afa77de47",
		alt: "Pristine beach view",
		name: "Coastal Retreat",
		ratio: 16 / 9,
	},
	{
		id: "1547901011-3972c67625cb",
		alt: "Detailed nature shot",
		name: "Flora Detail",
		ratio: 3 / 4,
	},
	{
		id: "1476514525535-07fb3b4ae5f1",
		alt: "Scenic mountain view",
		name: "Mountain Vista",
		ratio: 16 / 9,
	},
	{
		id: "1509024644558-2f56ce76c490",
		alt: "Travel exploration",
		name: "Journey Begins",
		ratio: 3 / 4,
	},
];

const getUnsplashUrl = (id: string, width: number, height: number) =>
	`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;

export function ImageGallery() {
	const allImages = [...galleryImages, ...galleryImages, ...galleryImages];

	return (
		<div className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-10">
			<div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
				{Array.from({ length: 4 }).map((_, colIndex) => (
					<div className="grid gap-4" key={colIndex}>
						{allImages
							.filter((_, i) => i % 4 === colIndex)
							.map((image, index) => {
								const width = image.ratio > 1 ? 1920 : 1080;
								const height = image.ratio > 1 ? 1080 : 1920;

								return (
									<div
										key={`${image.id}-${colIndex}-${index}`}
										className="relative group overflow-hidden rounded-xl"
									>
										<LazyImage
											alt={image.alt}
											fallback={`https://placehold.co/${width}x${height}/`}
											inView={true}
											ratio={image.ratio}
											src={getUnsplashUrl(image.id, width, height)}
										/>
										<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
											<p className="text-white font-medium text-sm translate-y-2 group-hover:translate-y-0 transition-transform">
												{image.name}
											</p>
										</div>
									</div>
								);
							})}
					</div>
				))}
			</div>
		</div>
	);
}
