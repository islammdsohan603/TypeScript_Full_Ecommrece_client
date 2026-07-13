import type { ComponentType, SVGProps } from 'react';
import { Bars, Gear, House, Magnifier, Person } from '@gravity-ui/icons';
import { Button, Drawer } from '@heroui/react';

const DashboardSiderbar = () => {
  const navItems: {
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    label: string;
  }[] = [
    { icon: House, label: 'Overview' },
    { icon: Magnifier, label: 'Add to Cart' },
    { icon: Person, label: 'Profile' },
    { icon: Gear, label: 'Settings' },
  ];

  const navcontant = (
    <nav className="flex flex-col gap-1">
      {navItems.map(item => (
        <button
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          type="button"
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </button>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {navcontant}
      </aside>

      <Drawer>
        <Button variant="secondary">
          <Bars />
          Menu
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>
                {/* navitem */}
                {navcontant}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
};

export default DashboardSiderbar;
