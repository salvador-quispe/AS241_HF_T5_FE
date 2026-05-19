// src/components/ui/StatCard.tsx

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
}: StatCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h3 className="text-3xl font-bold text-[#003F87] mt-2">
        {value}
      </h3>

      {subtitle && (
        <p className="text-sm text-gray-400 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}