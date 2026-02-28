'use client';

import Image from 'next/image';
import { useStore } from '@/context/store_context';

interface BankingInfoProps {
  totalAmount: number;
}

export default function BankingInfo({ totalAmount }: BankingInfoProps) {
  const { setNotification } = useStore();

  const bankInfo = {
    bankName: "MB Bank (MB)",
    accountNumber: "0397675801",
    accountName: "SI20K STORE",
    content: "SI20K ORDER"
  };

  // Tạo link QR Code động
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=Bank:MB;Account:${bankInfo.accountNumber};Amount:${totalAmount};Content:${bankInfo.content}`;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setNotification({ message: `Đã sao chép ${label}!`, type: 'success' });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
        <i className="fas fa-qrcode"></i> Payment Information
      </h3>

      <div className="flex flex-col items-center mb-8">
        <div className="p-3 bg-white border-2 border-primary/20 rounded-xl shadow-inner">
          {/* Dùng thẻ img thường cho QR code vì đây là external url động */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrUrl} alt="QR Code" className="w-48 h-48 object-contain rounded-lg" />
        </div>
        <p className="text-gray-500 text-sm mt-3 flex items-center gap-1">
          <i className="fas fa-scan"></i> Scan to pay instantly
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center py-3 border-b border-dashed border-gray-200">
          <span className="text-gray-500 font-medium">Bank</span>
          <span className="font-bold text-gray-800">{bankInfo.bankName}</span>
        </div>

        <div className="flex justify-between items-center py-3 border-b border-dashed border-gray-200">
          <span className="text-gray-500 font-medium">Account No.</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-800">{bankInfo.accountNumber}</span>
            <button 
              onClick={() => handleCopy(bankInfo.accountNumber, "số tài khoản")}
              className="text-primary hover:bg-primary/10 p-1.5 rounded transition-colors"
              title="Copy"
            >
              <i className="fas fa-copy"></i>
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center py-3 border-b border-dashed border-gray-200">
          <span className="text-gray-500 font-medium">Account Name</span>
          <span className="font-bold text-gray-800 uppercase">{bankInfo.accountName}</span>
        </div>

        <div className="flex justify-between items-center py-3 border-b border-dashed border-gray-200">
          <span className="text-gray-500 font-medium">Content</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-accent bg-accent/10 px-2 py-1 rounded text-sm">
              {bankInfo.content}
            </span>
            <button 
              onClick={() => handleCopy(bankInfo.content, "nội dung chuyển khoản")}
              className="text-primary hover:bg-primary/10 p-1.5 rounded transition-colors"
            >
              <i className="fas fa-copy"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}