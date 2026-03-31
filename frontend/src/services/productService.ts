// Product API service — communicates with the .NET backend

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5187/api';

/** Raw shape returned by GET /api/Products */
interface ProductDataDto {
  id: string;
  name: string;
  currentPrice: number;
  originalPrice: number;
  description: string;
  imageUrl: string;
  quantity: number;
  soldNumber: number;
  categoryName: string;
  categoryId: string;
  sellerName: string;
  sellerId: string;
}

/** Frontend Product shape */
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  img: string;
  category: string;
  categoryId?: string;
  stock?: number;
  sold?: number;
  sellerName?: string;
  sellerId?: string;
}

/** Map DTO → frontend Product */
function mapProduct(dto: ProductDataDto): Product {
  return {
    id: dto.id,
    name: dto.name,
    price: dto.currentPrice,
    originalPrice: dto.originalPrice,
    description: dto.description ?? '',
    img: dto.imageUrl ?? '',
    category: dto.categoryName?.toLowerCase() ?? '',
    categoryId: dto.categoryId,
    stock: dto.quantity,
    sold: dto.soldNumber,
    sellerName: dto.sellerName,
    sellerId: dto.sellerId,
  };
}

/** Fetch all products from the API */
export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/Products`);
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  const data: ProductDataDto[] = await res.json();
  return data.map(mapProduct);
}

/** Create a new product (requires seller JWT) */
export async function createProduct(
  payload: {
    name: string;
    currentPrice: number;
    originalPrice: number;
    description?: string;
    imageUrl?: string;
    categoryId: string;
    quantity: number;
    soldNumber?: number;
  },
  token: string
): Promise<void> {
  const res = await fetch(`${API_BASE}/Products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to create product: ${res.status}`);
}

/** Delete a product by ID (requires seller/admin JWT) */
export async function deleteProductById(id: string, token: string): Promise<void> {
  const res = await fetch(`${API_BASE}/Products/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Failed to delete product: ${res.status}`);
}
