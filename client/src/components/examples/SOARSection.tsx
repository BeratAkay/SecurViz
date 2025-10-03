import SOARSection from '../SOARSection'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function SOARSectionExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-6">
        <SOARSection />
      </div>
    </QueryClientProvider>
  )
}
