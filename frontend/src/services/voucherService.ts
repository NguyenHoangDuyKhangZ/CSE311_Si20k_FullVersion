const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5187/api';

export interface VoucherDataDto {
  id: string;
  voucherCode: string;
  discountType: string;
  discountAmount: number;
  minOrder: number;
  maxDiscount: number | null;
  description: string | null;
  isActive: boolean;
}

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

export async function fetchAllVouchers(token?: string): Promise<Voucher[]> {
  const headers: Record<string, string> = {};

  if (token && token.trim() !== '') {
    const cleanToken = token.replace(/^"|"$/g, '');
    headers['Authorization'] = `Bearer ${cleanToken}`;
  }

  const res = await fetch(`${API_BASE}/Voucher`, { headers });
  if (!res.ok) throw new Error(`Failed to fetch vouchers: ${res.status}`);
  const data: VoucherDataDto[] = await res.json();
  return data.map(mapVoucher).filter((v) => v.isActive);
}

export async function fetchVoucherByCode(code: string, token?: string): Promise<Voucher | null> {
  const headers: Record<string, string> = {};

  if (token && token.trim() !== '') {
    const cleanToken = token.replace(/^"|"$/g, '');
    headers['Authorization'] = `Bearer ${cleanToken}`;
  }

  const res = await fetch(`${API_BASE}/Voucher/code/${encodeURIComponent(code)}`, { headers });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch voucher: ${res.status}`);
  const dto: VoucherDataDto = await res.json();
  return mapVoucher(dto);
}