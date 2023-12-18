import PropTypes from "prop-types";
import React from "react";
import { Card, CardSubtitle, CardTitle } from "reactstrap";
// import { RiIconName } from 'remixicon-react';
// utils

const AppWidgetSummary = ({
  title,
  total,
  icon,
  color = "primary",
  ...other
}) => {
  return (
    <Card
      body
      className={`text-center bg-${color} text-${color} ${other.className}`}
      {...other}
    >
      <CardTitle
        tag="h3"
        className="mb-0 text-white"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ marginRight: "5px" }}>{total}</div>
        <i className={icon}></i>
      </CardTitle>
      <CardSubtitle tag="h6" className="mt-2 opacity-75 text-white">
        {title}
      </CardSubtitle>
    </Card>
  );
};

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default AppWidgetSummary;
