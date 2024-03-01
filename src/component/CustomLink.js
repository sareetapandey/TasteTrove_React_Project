// CustomLink.js
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const Link = ({ to, ...rest }) => {
  const context = React.useContext(RouterLink.context);
  const basename = context ? context.basename : "";
  const resolvedTo = basename ? `${basename}${to}` : to;

  return <RouterLink to={resolvedTo} {...rest} />;
};

export default Link;
