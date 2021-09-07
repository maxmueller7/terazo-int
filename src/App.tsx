import React, { FC, useState } from 'react';
import { AppBar, Tabs, Tab, Box, Container } from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';
import InfoIcon from '@material-ui/icons/Info';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import PollIcon from '@material-ui/icons/Poll';
import CapitalEquipmentPage from 'pages/CapitalEquipmentPage';
import AboutUs from 'pages/AboutUs';
import { InventoryPage } from 'pages/InventoryPage';
import { RealEstatePage } from 'pages/RealEstatePage';

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
  ABOUT_US = 'About Us',
}

const TabPanel = (props: ITabPanelProps) => {
  const { children, index, value } = props;

  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box
          style={{
            alignContent: 'space-between',
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'center',
          }}
          p={3}
        >
          {children}
        </Box>
      )}
    </div>
  );
};

const tabs: ITab[] = [
  {
    children: (
      <>
        <RealEstatePage />
      </>
    ),
    index: 0,
    label: TabTitles.REAL_ESTATE,
    icon: <HomeWorkIcon />,
  },
  {
    children: <CapitalEquipmentPage />,
    index: 1,
    label: TabTitles.CAPITAL_EQUIPMENT,
    icon: <BusinessIcon />,
  },
  {
    children: <InventoryPage />,
    index: 2,
    label: TabTitles.INVENTORY,
    icon: <PollIcon />,
  },
  {
    children: <AboutUs />,
    index: 3,
    label: TabTitles.ABOUT_US,
    icon: <InfoIcon />,
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
              key={`tab-key-${tab.index}${tab.label}`}
              id={`tab-id-${tab.index}`}
              icon={tab.icon}
            />
          ))}
        </Tabs>
      </AppBar>
      <Container style={{ display: 'flex', justifyContent: 'center' }}>
        {tabs.map((tab) => (
          <TabPanel
            children={tab.children}
            index={tab.index}
            label={tab.label}
            value={selectedTabIndexValue}
            key={`tab-panel-key-${tab.index}${tab.label}`}
            id={`tab-panel-id-${tab.index}`}
          />
        ))}
      </Container>
    </>
  );
};

export default App;
