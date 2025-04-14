import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string | number;
  title: string;
  price: number;
  thumbnail: string;
  images: string[];
  description: string;
  category: string;
  stock: number;
  rating?: number;
  brand?: string;
  discountPercentage?: number;
}

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  selectedCategory: string;
  searchQuery: string;
  sortOrder: 'none' | 'price-asc' | 'price-desc';
  isLoading: boolean;
  error: string | null;
}

const initialProducts: Product[] = [
  {
    id: 4,
    title: 'Red Lipstick',
    description:
      'The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.',
    category: 'beauty',
    price: 12.99,
    discountPercentage: 19.03,
    rating: 2.51,
    stock: 68,
    brand: 'Chic Cosmetics',
    images: [
      'https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/1.png',
    ],
    thumbnail:
      'https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png',
  },
  {
    id: 5,
    title: 'Red Nail Polish',
    description:
      'The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.',
    category: 'beauty',
    price: 8.99,
    discountPercentage: 2.46,
    rating: 3.91,
    stock: 71,
    brand: 'Nail Couture',
    images: [
      'https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/1.png',
    ],
    thumbnail:
      'https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png',
  },
  {
    id: 6,
    title: 'Calvin Klein CK One',
    description:
      "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
    category: 'fragrances',
    price: 49.99,
    discountPercentage: 0.32,
    rating: 4.85,
    stock: 17,
    brand: 'Calvin Klein',
    images: [
      'https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/1.png',
      'https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/2.png',
      'https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/3.png',
    ],
    thumbnail:
      'https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/thumbnail.png',
  },
  {
    id: 7,
    title: 'Chanel Coco Noir Eau De',
    description:
      'Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.',
    category: 'fragrances',
    price: 129.99,
    discountPercentage: 18.64,
    rating: 2.76,
    stock: 41,
    brand: 'Chanel',
    images: [
      'https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/1.png',
      'https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/2.png',
      'https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/3.png',
    ],
    thumbnail:
      'https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/thumbnail.png',
  },
  {
    id: 8,
    title: "Dior J'adore",
    description:
      "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
    category: 'fragrances',
    price: 89.99,
    discountPercentage: 17.44,
    rating: 3.31,
    stock: 91,
    brand: 'Dior',
    images: [
      "https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/1.png",
      "https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/2.png",
      "https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/3.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/thumbnail.png",
  },
  {
    id: 9,
    title: 'Dolce Shine Eau de',
    description:
      "Dolce Shine by Dolce & Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It's a joyful and youthful scent.",
    category: 'fragrances',
    price: 69.99,
    discountPercentage: 11.47,
    rating: 2.68,
    stock: 3,
    brand: 'Dolce & Gabbana',
    images: [
      'https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/1.png',
      'https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/2.png',
      'https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/3.png',
    ],
    thumbnail:
      'https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/thumbnail.png',
  },
  {
    id: 10,
    title: 'Gucci Bloom Eau de',
    description:
      "Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It's a modern and romantic scent.",
    category: 'fragrances',
    price: 79.99,
    discountPercentage: 8.9,
    rating: 2.69,
    stock: 93,
    brand: 'Gucci',
    images: [
      'https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/1.png',
      'https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/2.png',
      'https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/3.png',
    ],
    thumbnail:
      'https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/thumbnail.png',
  },
  {
    id: 11,
    title: 'Annibale Colombo Bed',
    description:
      'The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.',
    category: 'furniture',
    price: 1899.99,
    discountPercentage: 0.29,
    rating: 4.14,
    stock: 47,
    brand: 'Annibale Colombo',
    images: [
      'https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/1.png',
      'https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/2.png',
      'https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/3.png',
    ],
    thumbnail:
      'https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/thumbnail.png',
  },
  {
    id: 12,
    title: 'Annibale Colombo Sofa',
    description:
      'The Annibale Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.',
    category: 'furniture',
    price: 2499.99,
    discountPercentage: 18.54,
    rating: 3.08,
    stock: 16,
    brand: 'Annibale Colombo',
    images: [
      'https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/1.png',
      'https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/2.png',
      'https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/3.png',
    ],
    thumbnail:
      'https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/thumbnail.png',
  },
  {
    id: 13,
    title: 'Bedside Table African Cherry',
    description:
      'The Bedside Table in African Cherry is a stylish and functional addition to your bedroom, providing convenient storage space and a touch of elegance.',
    category: 'furniture',
    price: 299.99,
    discountPercentage: 9.58,
    rating: 4.48,
    stock: 16,
    brand: 'Furniture Co.',
    images: [
      'https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/1.png',
      'https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/2.png',
      'https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/3.png',
    ],
    thumbnail:
      'https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/thumbnail.png',
  },
];

const initialState: ProductState = {
  products: initialProducts,
  filteredProducts: initialProducts,
  selectedCategory: 'all',
  searchQuery: '',
  sortOrder: 'none',
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.filteredProducts = filterProducts(state);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredProducts = filterProducts(state);
    },
    setSortOrder: (
      state,
      action: PayloadAction<'none' | 'price-asc' | 'price-desc'>
    ) => {
      state.sortOrder = action.payload;
      state.filteredProducts = sortProducts(
        filterProducts(state),
        action.payload
      );
    },
  },
});

// Helper functions for filtering and sorting
const filterProducts = (state: ProductState): Product[] => {
  let result = state.products;

  // Filter by category
  if (state.selectedCategory !== 'all') {
    result = result.filter(
      (product) =>
        product.category.toLowerCase() === state.selectedCategory.toLowerCase()
    );
  }

  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase();
    result = result.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
  }

  // Sort the filtered results
  return sortProducts(result, state.sortOrder);
};

const sortProducts = (
  products: Product[],
  sortOrder: 'none' | 'price-asc' | 'price-desc'
): Product[] => {
  const result = [...products];

  if (sortOrder === 'price-asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-desc') {
    result.sort((a, b) => b.price - a.price);
  }

  return result;
};

export const { setCategory, setSearchQuery, setSortOrder } =
  productSlice.actions;
export default productSlice.reducer;
