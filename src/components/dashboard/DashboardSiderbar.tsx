'use client';

import { Bars, Gear, House, Magnifier, Person } from '@gravity-ui/icons';
import { Button, Drawer } from '@heroui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const DashboardSiderbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: House, label: 'Overview', href: '/dashboard/admin' },
    { icon: Magnifier, label: 'Add to Cart', href: '/cart' },
    { icon: Person, label: 'Profile', href: '/profile' },
    { icon: Gear, label: 'Settings', href: '/dashboard/settings' },
  ];

  const navContent = (
    <nav className="flex flex-col gap-1.5 mt-4">
      {navItems.map(item => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
              isActive
                ? 'bg-orange-950/30 text-orange-400 border border-orange-950'
                : 'text-gray-400 hover:bg-orange-950/10 hover:text-gray-200'
            }`}
          >
            <item.icon
              className={`size-5 ${isActive ? 'text-orange-400' : 'text-gray-500'}`}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* 💻 Desktop View: Aside Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-orange-950/20 bg-[#0d0705]/40 p-4 lg:block">
        <div className="mb-6 px-4">
          <h2 className="text-base font-bold tracking-wider text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-600 uppercase">
            Dashboard
          </h2>
        </div>
        {navContent}
      </aside>

      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          onPress={() => setIsOpen(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-lg shadow-black/50 flex items-center gap-2 h-10 px-4 min-w-0"
        >
          <Bars className="size-4" />
          <span className="text-xs font-semibold">Menu</span>
        </Button>
      </div>

      {/* HeroUI Drawer Config */}
      <Drawer isOpen={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Backdrop />
        <Drawer.Content
          placement="left"
          className="bg-[#110a07] text-white border-r border-orange-950/20 max-w-2xs"
        >
          <Drawer.Dialog className="p-4">
            <Drawer.CloseTrigger className="text-gray-400 hover:text-white" />
            <Drawer.Header className="border-b border-orange-950/20 pb-4">
              <Drawer.Heading className="text-orange-400 font-bold tracking-wide">
                Navigation
              </Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>{navContent}</Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer>
    </>
  );
};

export default DashboardSiderbar;
