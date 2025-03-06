'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    // The auth callback is handled automatically by Supabase client
    // Just redirect to home or dashboard
    router.push('/home')
  }, [router])

  return <div>Processing authentication...</div>
}