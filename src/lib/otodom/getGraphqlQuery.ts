import * as fs from "fs";
import query from "./otodom.json";
const getGraphlQuery = (queryObject: Record<string, unknown>) => {
  // @ts-expect-error wtf
  const query = (obj: Record<string, unknown>, level = 1) => {
    const indent = "  ".repeat(level);
    // @ts-expect-error wtf
    const lines = Object.entries(obj).map(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length === 0) {
          return ``;
        }

        if (typeof value[0] === "string" || typeof value[0] === "number") {
          return `${indent}${key}`;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return `${indent}${key} {\n${query(value[0], level + 2)}${indent}\n${indent}}`;
      }

      if (typeof value === "string") {
        return `${indent}${key}`;
      }

      if (value === null) {
        return ``;
      }

      if (typeof value === "object") {
        // use fragment
        if ("__typename" in value && typeof value.__typename === "string") {
          return `${indent}${key} {\n${indent}... on ${value.__typename} {\n${query(value, level + 2)}\n${indent}}\n${indent}}`;
        }
        // @ts-expect-error wtf
        return `${indent}${key} {\n${query(value, level + 2)}${indent}\n${indent}}`;
      }

      return `${indent}${key}`;
    });
    // @ts-expect-error wtf
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return lines.filter((l) => l.trim()).join("\n");
  };

  return `query {
${query(queryObject)}
}`;
};

fs.writeFileSync("./result.txt", getGraphlQuery(query));
