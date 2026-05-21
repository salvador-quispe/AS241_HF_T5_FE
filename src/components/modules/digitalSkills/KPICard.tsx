interface KPICardProps {
  title: string
  value: string | number
  subtitle?: string
  variant?: 'default' | 'warning'
}

export default function KPICard({ title, value, subtitle, variant = 'default' }: KPICardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
        {title}
      </h3>
      <div className={`text-3xl font-bold mb-2 ${
        variant === 'warning' ? 'text-orange-600' : 'text-[#003F87]'
      }`}>
        {value}
      </div>
      {subtitle && (
        <p className="text-xs text-gray-500 font-medium">
          {subtitle}
        </p>
      )}
    </div>
  )
}
