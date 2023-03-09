import React from "react";
import { Layout, LayoutProps } from "@ui-kitten/components";
import useLayout from "@hooks/useLayout";

interface ContainerProps extends LayoutProps {
  useSafeArea?: boolean;
  paddingBottom?: boolean;
  paddingTop?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  style,
  useSafeArea,
  paddingTop,
  paddingBottom,
  ...props
}) => {
  const { top, bottom } = useLayout();
  return (
    <Layout
      {...props}
      style={[
        { flex: 1 },
        paddingTop && { paddingTop: top },
        paddingBottom && { paddingBottom: bottom },
        useSafeArea && { paddingTop: top, paddingBottom: bottom },
        style,
      ]}
    >
      {children}
    </Layout>
  );
};

export default Container;
