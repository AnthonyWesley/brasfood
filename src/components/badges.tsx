import { Refrigerator, Snowflake, Sun } from "lucide-react";
import { storageLabels } from "@/lib/site";
import type { ProductBadge, RegistrationStatus, Storage } from "@/lib/types";

const storageStyle: Record<Storage, { icon: typeof Snowflake; className: string }> = {
  frozen: { icon: Snowflake, className: "bg-info-soft text-info" },
  chilled: { icon: Refrigerator, className: "bg-[#ddf1ee] text-[#0f6b5e]" },
  ambient: { icon: Sun, className: "bg-accent-soft text-[#7a5a00]" },
};

export function StorageTag({ storage }: { storage: Storage }) {
  const { icon: Icon, className } = storageStyle[storage];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${className}`}>
      <Icon className="size-3.5" aria-hidden="true" />
      {storageLabels[storage]}
    </span>
  );
}

const productBadge: Record<ProductBadge, { label: string; className: string }> = {
  new: { label: "New", className: "bg-brand text-white" },
  "out-of-stock": { label: "Out of stock", className: "bg-charcoal text-white" },
  "coming-soon": { label: "Coming soon", className: "bg-info text-white" },
};

export function ProductBadgeTag({ badge }: { badge: ProductBadge }) {
  const { label, className } = productBadge[badge];
  return <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${className}`}>{label}</span>;
}

const statusStyle: Record<RegistrationStatus, { label: string; className: string }> = {
  pending: { label: "Pending review", className: "bg-accent-soft text-[#7a5a00]" },
  approved: { label: "Approved", className: "bg-success-soft text-success" },
  rejected: { label: "Rejected", className: "bg-danger-soft text-danger" },
};

export function StatusTag({ status }: { status: RegistrationStatus }) {
  const { label, className } = statusStyle[status];
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}>{label}</span>;
}
