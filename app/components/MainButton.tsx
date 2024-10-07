import React, { FC, useMemo } from "react";
import { Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { COLORS, FONTS } from "../config";

type Variant = "simple" | "filled"

interface Props {
    isReady?: boolean
    title: string
    buttonStyle?: StyleProp<ViewStyle>
    variant?: Variant
    onPress: () => void
}

export const MainButton: FC<Props> = ({ isReady = true, title, buttonStyle, variant, onPress }) => {
    const styles = useMemo(() => getStyle(variant, isReady), [variant, isReady]);

    return (
        <TouchableOpacity disabled={!isReady || !onPress} activeOpacity={0.6} onPress={onPress} style={[styles.button, buttonStyle]}>
            <Text numberOfLines={1} style={[variant !== "simple" ? styles.label : styles.labelSimple]}>{title}</Text>
        </TouchableOpacity>
    );

};

export const getStyle = (variant?: Variant, isReady?: boolean) => {
    return StyleSheet.create({
        button: {
            width: "100%",
            height: 50,
            opacity: isReady ? 1 : 0.5,
            borderRadius: 10,
            backgroundColor: variant !== "simple" ? COLORS.blue : "transparent",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 16
        },
        label: {
            color: COLORS.white,
            fontSize: 16,
            fontFamily: FONTS.Poppins_SemiBold
        },
        labelSimple: {
            color: COLORS.darkGrey,
            fontSize: 14,
            fontFamily: FONTS.Poppins_SemiBold
        }
    });
};

