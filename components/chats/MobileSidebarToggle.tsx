// components/chats/MobileSidebarToggle.tsx
'use client'

import { FiMenu } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import Button from '@/components/common/Button'
import { setCookie } from '@/lib/mockchat/actions'

interface MobileSidebarToggleProps {
  defaultOpen: boolean
}

export default function MobileSidebarToggle({ defaultOpen }: MobileSidebarToggleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  useEffect(() => {
    // Update the data-state attribute on the sidebar
    const sidebar = document.querySelector('[data-state]')
    if (sidebar) {
      sidebar.setAttribute('data-state', isOpen ? 'open' : 'closed')
    }
    
    // Save state to cookie
    setCookie('sidebar-state', isOpen ? 'open' : 'closed')
  }, [isOpen])

  return (
    <Button 
      size="sm"
      className="md:hidden fixed top-4 left-4 z-20 bg-surface/80 backdrop-blur-sm"
      onClick={() => setIsOpen(!isOpen)}
      aria-label="Toggle sidebar"
    >
      <FiMenu className="w-5 h-5" />
    </Button>
  )
}