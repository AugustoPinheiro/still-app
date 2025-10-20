import React from "react";
import { StyleSheet, ViewProps } from "react-native";

import * as S from "./styles";

const getItemStyle = (index: number, numColumns: number) => {
  const alignItems = (() => {
    if (numColumns < 2 || index % numColumns === 0) return "flex-start";
    if ((index + 1) % numColumns === 0) return "flex-end";

    return "center";
  })();

  return {
    alignItems,
    width: "100%",
  } as const;
};

type ColumnItemProps = ViewProps & {
  children: React.ReactNode;
  index: number;
  numColumns: number;
};

export const ColumnItem = ({ children, index, numColumns, ...rest }: ColumnItemProps) => (
    <S.Container
      style={
        StyleSheet.flatten([
          getItemStyle(index, numColumns),
          rest.style,
        ])
      }
      {...rest}
    >
      {children}
    </S.Container>
);
