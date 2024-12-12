import { Suspense } from 'react'
import { CitySelector } from '../components/city-selector'
import { DateRangePicker } from '../components/data-range-picker'
import { EnvironmentalMetrics } from '../components/environmental-metrics'
import { PostOfficeSelector } from '../components/post-office-selector'
import { SummaryCards } from "../components/summary-cards"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">Environmental Metrics Dashboard</h1>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <CitySelector />
          <PostOfficeSelector />
        </div>
        <DateRangePicker />
      </div>
      <Suspense fallback={<div>Loading summary...</div>}>
        <SummaryCards />
      </Suspense>
      <Suspense fallback={<div>Loading metrics...</div>}>
        <EnvironmentalMetrics />
      </Suspense>
    </div>
  )
}

