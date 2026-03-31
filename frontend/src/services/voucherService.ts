// Voucher API service — communicates with the .NET backend
// Endpoints require a valid JWT (Authorization: Bearer <token>)

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5187/api';

// ─── Raw DTO returned by the backend ────────────────────────────────────────────
export interface VoucherDataDto {
  id: string;                 // Guid as string
  voucherCode: string;
  discountType: string;       // "Percent" | "Fixed" | "PercentUpTo"
  discountAmount: number;
  minOrder: number;
  maxDiscount: number | null;
  description: string | null;
  isActive: boolean;
}

// ─── Frontend-friendly Voucher shape ────────────────────────────────────────────
export interface Voucher {
  id: string;
  code: string;
  discountType: 'Percent' | 'Fixed' | 'PercentUpTo';
  discountAmount: number;
  minOrder: number;
  maxDiscount?: number | null;
  description: string;
  isActive: boolean;
}

// ─── Mapper ──────────────────────────────────────────────────────────────────────
function mapVoucher(dto: VoucherDataDto): Voucher {
  return {
    id: dto.id,
    code: dto.voucherCode,
    discountType: dto.discountType as Voucher['discountType'],
    discountAmount: dto.discountAmount,
    minOrder: dto.minOrder,
    maxDiscount: dto.maxDiscount ?? undefined,
    description: dto.description ?? '',
    isActive: dto.isActive,
  };
}

// ─── API Functions ────────────────────────────────────────────────────────────────

/** Fetch all active vouchers (requires auth token) */
export async function fetchAllVouchers(token: string): Promise<Voucher[]> {
  const res = await fetch(`${API_BASE}/Voucher`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Failed to fetch vouchers: ${res.status}`);
  const data: VoucherDataDto[] = await res.json();
  return data.map(mapVoucher).filter((v) => v.isActive);
}

/** Look up a single voucher by code (requires auth token) */
export async function fetchVoucherByCode(code: string, token: string): Promise<Voucher | null> {
  const res = await fetch(`${API_BASE}/Voucher/code/${encodeURIComponent(code)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch voucher: ${res.status}`);
  const dto: VoucherDataDto = await res.json();
  return mapVoucher(dto);
}
