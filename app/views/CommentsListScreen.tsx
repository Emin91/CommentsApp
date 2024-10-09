import React, { useMemo } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { CommentComponent } from "../components/CommentComponent";
import { MOCK_COMMENTS } from "./commentListData";
import { COLORS } from "../config";

export const CommentListScreen = ({ }) => {
    const styles = useMemo(() => getStyle(), []);

    return (
        <View style={styles.container}>
            <FlatList
                data={MOCK_COMMENTS}
                keyExtractor={(comment) => comment.id}
                contentContainerStyle={{ paddingTop: 12 }}
                renderItem={(({ item, index }) => (
                    <CommentComponent key={index} {...{ item, arr: MOCK_COMMENTS }} isShowReplies={!false} />
                ))}
            />
        </View>
    );
};

export const getStyle = () => {
    return StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 4,
            backgroundColor: COLORS.white
        }

    });
};