import React from "react";

export type RouteConfig = {
  path: string;
  title: string;
  component: React.ComponentType;
  showHeader?: boolean;
  showSubHeader?: boolean;
  showNavbar?: boolean;
};
export type FloorplanConfig = {
  showHeader: boolean;
  showSubHeader: boolean;
  routes: RouteConfig[];
};
