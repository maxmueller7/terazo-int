import React, { FC, useState } from 'react';
import { AppBar, Tabs, Tab, Box } from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';
import CapitalEquipmentPage from 'pages/CapitalEquipmentPage';

interface ITab {
  children?: React.ReactNode;
  index: number;
  label: string;
  icon?: any;
}

interface ITabPanelProps extends ITab {
  value: number;
  id: string;
}

export enum TabTitles {
  CAPITAL_EQUIPMENT = 'Capital Equipment',
  INVENTORY = 'Inventory',
  REAL_ESTATE = 'Real Estate',
}

const TabPanel = (props: ITabPanelProps) => {
  const { children, index, value } = props;

  return (
    <div hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const tabs: ITab[] = [
  {
    children: <CapitalEquipmentPage />,
    index: 0,
    label: TabTitles.CAPITAL_EQUIPMENT,
    icon: <BusinessIcon />,
  },
];

const App: FC<{}> = (): JSX.Element => {
  const [selectedTabIndexValue, setSelectedTabIndexValue] = useState(0);

  const handleTabChange = (
    event: React.ChangeEvent<{}>,
    newTabIndexValue: number
  ) => {
    setSelectedTabIndexValue(newTabIndexValue);
  };

  return (
    <>
      <AppBar position='static'>
        <Tabs centered onChange={handleTabChange} value={selectedTabIndexValue}>
          {tabs.map((tab) => (
            <Tab
              label={tab.label}
              key={`tab-key-${tab.index}`}
              id={`tab-id-${tab.index}`}
              icon={tab.icon}
            />
          ))}
        </Tabs>
      </AppBar>
      {tabs.map((tab) => (
        <TabPanel
          children={tab.children}
          index={tab.index}
          label={tab.label}
          value={selectedTabIndexValue}
          key={`tab-panel-key-${tab.index}`}
          id={`tab-panel-id-${tab.index}`}
        />
      ))}
    </>
  );
};

export default App;
