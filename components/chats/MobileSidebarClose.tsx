'use client'

import { FiX } from 'react-icons/fi'
import Button from '@/components/common/Button'

export default function MobileSidebarClose() {
  return (
    <div className="p-2 md:hidden flex justify-end">
      <Button 
        size="sm"
        onClick={() => {
          // Update the data-state attribute on the sidebar
          const sidebar = document.querySelector('[data-state]')
          if (sidebar) {
            sidebar.setAttribute('data-state', 'closed')
          }
        }}
        aria-label="Close sidebar"
      >
        <FiX className="w-5 h-5" />
      </Button>
    </div>
  )
}