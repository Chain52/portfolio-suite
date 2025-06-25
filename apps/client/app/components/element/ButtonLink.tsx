import { Icon } from '@iconify/react/dist/iconify.js';
import clsx from 'clsx';
import { Flex } from './Flex';

interface ButtonLinkProps {
  href: string;
  text: string;
  target?: 'self' | 'blank';
  icon?: string;
  className?: string;
}

export function ButtonLink({
  href,
  text,
  target = 'self',
  icon,
  className = 'font-medium'
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      target={`_${target}`}
      className={clsx(
        'rounded-full bg-blue-600 px-4 py-3 text-white hover:bg-blue-700',
        className
      )}
    >
      <Flex align="center" className="gap-2">
        {icon && <Icon icon={icon} className="text-2xl" />}
        {text}
      </Flex>
    </a>
  );
}
