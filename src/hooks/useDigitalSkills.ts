import { useState, useEffect } from 'react'
import { digitalSkillsService } from '../api/digitalSkillsApi'
import type { DashboardHabilidadesDigitales } from '../types/digitalSkills'

export function useDigitalSkills() {
  const [data, setData] = useState<DashboardHabilidadesDigitales | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboard = async () => {
    try {
      setLoading(true)
      setError(null)
      const dashboardData = await digitalSkillsService.getDashboard()
      setData(dashboardData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar los datos')
      console.error('Error fetching digital skills dashboard:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  return {
    data,
    loading,
    error,
    refetch: fetchDashboard,
  }
}
