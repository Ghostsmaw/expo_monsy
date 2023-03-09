import React from "react";
import { View, StyleSheet, ImageRequireSource, Image } from "react-native";
import { Button, Modal, Layout } from "@ui-kitten/components";
import { EvaStatus } from "@ui-kitten/components/devsupport";
import { useTranslation } from "react-i18next";
import useAppTheme from "@hooks/useAppTheme";
import useLayout from "@hooks/useLayout";

import Text from "./Text";

import { IMAGE_ICON } from "@assets/Icon";

interface ModalConfirmProps {
  title: string;
  image?: ImageRequireSource;
  buttonLeft?: {
    title?: string;
    onPress?: () => void;
    status?: EvaStatus;
  };
  buttonRight?: {
    title?: string;
    onPress?: () => void;
    status?: EvaStatus;
  };
}

function ModalConfirm(
  { title, image, buttonLeft, buttonRight }: ModalConfirmProps,
  ref: React.ForwardedRef<{ show: () => void; hide: () => void }>
) {
  const { t } = useTranslation("common");
  const { theme } = useAppTheme();

  const modalRef = React.useRef<Modal>(null);

  React.useImperativeHandle(ref, () => ({
    show: () => {
      modalRef.current?.show();
    },
    hide: () => {
      modalRef.current?.hide();
    },
  }));

  const hide = React.useCallback(() => {
    modalRef.current?.hide();
  }, []);

  const { width } = useLayout();

  return (
    <Modal
      ref={modalRef}
      onBackdropPress={hide}
      backdropStyle={[
        styles.container,
        {
          backgroundColor:
            theme === "light"
              ? "rgba(30, 31, 32, 0.86)"
              : "rgba(0, 0, 0, 0.86)",
        },
      ]}
    >
      <Layout style={[styles.modal, { width: width - 32 }]}>
        <Image
          style={styles.image}
          source={image ? image : IMAGE_ICON.confuse}
        />
        <Text category="headline" marginTop={32} marginHorizontal={32} center>
          {title}
        </Text>
        <View style={styles.buttonView}>
          <Button
            status={buttonLeft?.status || "primary"}
            onPress={buttonLeft?.onPress}
            style={styles.button}
          >
            {buttonLeft?.title || t("cancel").toString()}
          </Button>
          <Button
            style={[styles.button, { marginLeft: 16 }]}
            onPress={buttonRight?.onPress}
            status={buttonRight?.status || "basic"}
          >
            {buttonRight?.title || t("remove").toString()}
          </Button>
        </View>
      </Layout>
    </Modal>
  );
}

export default React.forwardRef(ModalConfirm) as (
  props: ModalConfirmProps & {
    ref?: React.ForwardedRef<{ show: () => void; hide: () => void }>;
  }
) => ReturnType<typeof ModalConfirm>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    paddingTop: 20,
    borderRadius: 16,
    paddingBottom: 48,
  },
  image: {
    alignSelf: "center",
  },
  buttonView: {
    paddingHorizontal: 68,
    marginTop: 32,
    flexDirection: "row",
  },
  button: {
    flex: 1,
  },
});
