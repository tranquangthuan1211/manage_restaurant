import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Box, Stack } from '@mui/material';
import { MobileNavItem } from './mobile-nav-item';

interface Item {
  disabled?: boolean;
  external?: boolean;
  icon?: ReactNode;
  items?: Item[];
  label?: ReactNode;
  path?: string;
  title: string;
}

const renderItems = ({
  depth = 0,
  items,
  pathname
}: {
  depth?: number;
  items: Item[];
  pathname?: string | null;
}): JSX.Element[] => items.reduce(
  (acc: JSX.Element[], item) => reduceChildRoutes({
    acc,
    depth,
    item,
    pathname
  }),
  []
);

const reduceChildRoutes = ({
  acc,
  depth,
  item,
  pathname
}: {
  acc: JSX.Element[];
  depth: number;
  item: Item;
  pathname?: string | null;
}): Array<JSX.Element> => {
  const checkPath = !!(item.path && pathname);
  const partialMatch = checkPath ? pathname.includes(item.path!) : false;
  const exactMatch = checkPath ? pathname === item.path : false;

  if (item.items) {
    acc.push(
      <MobileNavItem
        active={partialMatch}
        depth={depth}
        disabled={item.disabled}
        icon={item.icon}
        key={item.title}
        open={partialMatch}
      >
        <Stack
          component="ul"
          spacing={0.5}
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0
          }}
        >
          {renderItems({
            depth: depth + 1,
            items: item.items,
            pathname
          })}
        </Stack>
      </MobileNavItem>
    );
  } else {
    acc.push(
      <MobileNavItem
        active={exactMatch}
        depth={depth}
        disabled={item.disabled}
        external={item.external}
        icon={item.icon}
        key={item.title}
        path={item.path}
      />
    );
  }

  return acc;
};

interface MobileNavSectionProps {
  items?: Item[];
  pathname?: string | null;
  subheader?: string;
}

export const MobileNavSection: FC<MobileNavSectionProps> = (props) => {
  const { items = [], pathname, subheader = '', ...other } = props;

  return (
    <Stack
      component="ul"
      spacing={0.5}
      flexDirection={'column'}
      sx={{
        listStyle: 'none',
        m: 0,
        p: 0,
        alignItems:'center'

      }}
      {...other}
    >
      {renderItems({ items, pathname })}
    </Stack>
  );
};

MobileNavSection.propTypes = {
  items: PropTypes.array,
  pathname: PropTypes.string,
  subheader: PropTypes.string
};
