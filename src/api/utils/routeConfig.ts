import React from "react";

export type RouteConfig = {
  path: string;
  component: React.ComponentType;
  showHeader?: boolean;
  showSubHeader?: boolean;
};
