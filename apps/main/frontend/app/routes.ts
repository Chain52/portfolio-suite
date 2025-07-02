import {
  type RouteConfig,
  type RouteConfigEntry,
  index,
  layout,
  prefix,
  route
} from "@react-router/dev/routes";

export const RouteType = Object.freeze({
  Index: "index",
  Parentable: "route",
  Layout: "layout",
  Prefix: "prefix"
});

interface BaseRouteDefinition {
  file: string;
  path: string;
  name: string;
}

interface IndexRouteDefinition extends BaseRouteDefinition {
  type: typeof RouteType.Index;
}

interface ParentableRouteDefinition extends BaseRouteDefinition {
  type: typeof RouteType.Parentable;
  children?: RouteDefinition[];
}

interface LayoutRouteDefinition extends BaseRouteDefinition {
  type: typeof RouteType.Layout;
  children: RouteDefinition[];
}

interface PrefixRouteDefinition extends BaseRouteDefinition {
  type: typeof RouteType.Prefix;
  children: RouteDefinition[];
}

type RouteDefinition =
  | IndexRouteDefinition
  | ParentableRouteDefinition
  | LayoutRouteDefinition
  | PrefixRouteDefinition;

// Obfuscate route definitions to use in Navbar
export const ROUTE_DEFINITIONS: RouteDefinition[] = [
  { type: RouteType.Index, file: "routes/home.tsx", path: "home", name: "Home" }
];

const generateRoutes = (routes: RouteDefinition[]): RouteConfigEntry[] => {
  const result: RouteConfigEntry[] = [];
  routes.forEach((routeDef) => {
    switch (routeDef.type) {
      case RouteType.Index:
        result.push(index(routeDef.file));
        break;
      case RouteType.Parentable:
        result.push(
          route(
            routeDef.path,
            routeDef.file,
            routeDef.children && generateRoutes(routeDef.children)
          )
        );
        break;
      case RouteType.Layout:
        result.push(layout(routeDef.file, generateRoutes(routeDef.children)));
        break;
      case RouteType.Prefix:
        prefix(routeDef.path, generateRoutes(routeDef.children)).forEach(
          (prefixedRouteDef) => result.push(prefixedRouteDef)
        );
        break;
    }
  });
  return result;
};

export default generateRoutes(ROUTE_DEFINITIONS) satisfies RouteConfig;
