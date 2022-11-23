import React, { useState } from "react";
import PropTypes from "prop-types";

import { Tabs, Tab, Box, Card } from "@mui/material";

import FormArea from "./form/FormArea";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Navigations() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Card
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          p: 1,
          pb: 2,
          mt: 3,
          mb: 4,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Акции" {...a11yProps(0)} />
          <Tab label="Карточка товара" {...a11yProps(1)} />
          <Tab label="Каталог" {...a11yProps(2)} />
        </Tabs>
      </Card>

      <Card sx={{ width: "100%", marginTop: "20px" }}>
        <TabPanel value={value} index={0}>
          <FormArea />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Card>
    </>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
