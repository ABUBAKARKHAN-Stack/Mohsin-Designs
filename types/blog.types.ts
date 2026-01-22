export interface BlogPost {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt?: string;
    mainImage?: any;
    author?: string;
    location?: string;
    service?: {
        _ref?: string;
        _type?: "reference";
        // For expanded queries
        title?: string;
        slug?: { current: string };
    };
    category?: string; // legacy string or new array? Schema uses 'categories' array. I'll support both for transition or just array. Schema has 'categories'.
    categories?: any[];
    publishedAt?: string;
    date?: string; // legacy display date
    readTime?: string;
    body?: any;
}
