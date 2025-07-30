// High-quality professional tile project images
export const tileProjectImages = {
    subway: {
        id: 'tile-subway-001',
        title: 'Classic White Subway Tile',
        url: 'https://images.unsplash.com/photo-1552321554-8213a5b8eacd?w=800&q=80',
        fallback: '/images/tiles/subway-tile-fallback.jpg',
        description: 'Timeless white subway tile backsplash with dark grout',
        tags: ['subway', 'white', 'backsplash', 'classic']
    },
    hexagon: {
        id: 'tile-hexagon-001',
        title: 'Modern Hexagon Floor Tiles',
        url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
        fallback: '/images/tiles/hexagon-tile-fallback.jpg',
        description: 'Geometric hexagon tiles creating stunning floor patterns',
        tags: ['hexagon', 'geometric', 'floor', 'modern']
    },
    marble: {
        id: 'tile-marble-001',
        title: 'Luxurious Marble Tile Shower',
        url: 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=800&q=80',
        fallback: '/images/tiles/marble-tile-fallback.jpg',
        description: 'Premium marble tiles with elegant veining patterns',
        tags: ['marble', 'luxury', 'shower', 'natural']
    },
    herringbone: {
        id: 'tile-herringbone-001',
        title: 'Herringbone Tile Pattern',
        url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
        fallback: '/images/tiles/herringbone-tile-fallback.jpg',
        description: 'Sophisticated herringbone pattern in kitchen backsplash',
        tags: ['herringbone', 'pattern', 'sophisticated', 'kitchen']
    },
    largFormat: {
        id: 'tile-large-001',
        title: 'Large Format Tiles',
        url: 'https://images.unsplash.com/photo-1605300041665-08ed5b80f85d?w=800&q=80',
        fallback: '/images/tiles/large-format-fallback.jpg',
        description: 'Seamless large format tiles for modern minimalist look',
        tags: ['large', 'format', 'minimalist', 'seamless']
    },
    mosaic: {
        id: 'tile-mosaic-001',
        title: 'Artistic Mosaic Tile Work',
        url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80',
        fallback: '/images/tiles/mosaic-tile-fallback.jpg',
        description: 'Custom mosaic tile designs for unique feature walls',
        tags: ['mosaic', 'artistic', 'custom', 'feature']
    }
};

export const tileProjects = [
    {
        id: 11,
        title: 'Subway Tile Backsplash',
        url: tileProjectImages.subway.url,
        category: 'tile',
        tags: tileProjectImages.subway.tags,
        description: tileProjectImages.subway.description
    },
    {
        id: 12,
        title: 'Marble Tile Shower',
        url: tileProjectImages.marble.url,
        category: 'tile',
        tags: tileProjectImages.marble.tags,
        description: tileProjectImages.marble.description
    },
    {
        id: 17,
        title: 'Mosaic Tile Feature Wall',
        url: tileProjectImages.mosaic.url,
        category: 'tile',
        tags: tileProjectImages.mosaic.tags,
        description: tileProjectImages.mosaic.description
    },
    {
        id: 21,
        title: 'Hexagon Tile Floor',
        url: tileProjectImages.hexagon.url,
        category: 'tile',
        tags: tileProjectImages.hexagon.tags,
        description: tileProjectImages.hexagon.description
    },
    {
        id: 26,
        title: 'Herringbone Tile Pattern',
        url: tileProjectImages.herringbone.url,
        category: 'tile',
        tags: tileProjectImages.herringbone.tags,
        description: tileProjectImages.herringbone.description
    },
    {
        id: 29,
        title: 'Large Format Tile Installation',
        url: tileProjectImages.largFormat.url,
        category: 'tile',
        tags: tileProjectImages.largFormat.tags,
        description: tileProjectImages.largFormat.description
    }
];
