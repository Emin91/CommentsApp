import React, { FC, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../config";
import { IComment } from "../views/commentListData";
import Animated, { FadeInDown, LinearTransition } from "react-native-reanimated";

interface Props {
    item: IComment
    isShowReplies?: boolean
    isReply?: boolean
    parentComment?: IComment
    onPressReply: (item: IComment) => void
}

export const CommentComponent: FC<Props> = ({ item, isShowReplies, isReply, parentComment, onPressReply }) => {
    const [isExpand, setIsExpand] = useState(false);
    const styles = getStyle(isExpand, isReply);

    const onPressReplyHandler = () => {
        onPressReply?.(item);
    };

    return (
        <Animated.View layout={LinearTransition.stiffness(300)} entering={FadeInDown.duration(400)} style={styles.container}>
            {isReply && <View style={styles.verticalLine} />}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Image source={{ uri: "https://avatar.iran.liara.run/public/boy" }} style={styles.icon} />
                    <Text style={styles.userName} numberOfLines={1}>{item.username}</Text>
                </View>
                {item?.replies?.length
                    ? <TouchableOpacity onPress={() => setIsExpand(!isExpand)}>
                        <Text style={styles.userName}>Expand</Text>
                    </TouchableOpacity>
                    : null
                }
            </View>
            {isReply && parentComment ? (
                <Text style={styles.replyToComment} numberOfLines={1}>
                    Reply to comment: <Text style={{ fontFamily: FONTS.Poppins_SemiBold }}>{parentComment.text}</Text>
                </Text>
            ) : null}
            <View style={{ padding: 10 }}>
                <Text style={styles.comment}>{item.text}</Text>
                <TouchableOpacity onPress={onPressReplyHandler} style={styles.replyButton}>
                    <Text style={styles.reply}>
                        <Text>{item?.replies?.length ? `[${item?.replies?.length}] ` : ""}</Text>
                        Reply
                    </Text>
                </TouchableOpacity>
            </View>
            {isShowReplies && isExpand && <FlatList
                data={item.replies}
                style={styles.replyList}
                keyExtractor={(reply) => reply.id!}
                renderItem={(({ item: replyItem }) => (
                    <CommentComponent item={replyItem} parentComment={item} isShowReplies isReply onPressReply={onPressReply} />
                ))}
            />}
        </Animated.View>
    );
};

export const getStyle = (isExpand?: boolean, isReply?: boolean) => {
    return StyleSheet.create({
        container: {
            width: "100%",
            borderBottomWidth: 2,
            backgroundColor: COLORS.lightBlue,
            borderLeftWidth: isExpand && isReply ? 1 : 0,
            borderLeftColor: COLORS.blue,
            marginBottom: !isReply ? 20 : 0,
            paddingBottom: isReply ? 0 : 0,
            borderBottomColor: !isReply ? COLORS.grey : "transparent"
        },
        verticalLine: {
            width: 26,
            height: 1,
            backgroundColor: COLORS.blue,
            position: "absolute",
            left: -26,
            top: 20,
            zIndex: 1
        },
        replyList: {
            paddingLeft: 24,
            borderLeftColor: !isReply ? COLORS.blue : "transparent",
            borderLeftWidth: 1
        },
        header: {
            width: "100%",
            height: 44,
            flexDirection: "row",
            paddingHorizontal: 10,
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: COLORS.blue
        },
        headerLeft: {
            alignItems: "center",
            flexDirection: "row"
        },
        icon: {
            width: 40,
            height: 40,
            borderRadius: 40,
            borderWidth: 2,
            borderColor: COLORS.white,
            backgroundColor: COLORS.grey
        },
        userName: {
            marginLeft: 12,
            fontSize: 14,
            color: COLORS.white,
            fontFamily: FONTS.Poppins_SemiBold
        },
        comment: {
            fontSize: 14,
            color: COLORS.black,
            fontFamily: FONTS.Poppins_Medium,
            minHeight: !isReply ? 40 : 0,
            paddingBottom: isReply ? 10 : 0
        },
        replyToComment: {
            fontSize: 12,
            marginVertical: 4,
            color: COLORS.greySecond,
            fontFamily: FONTS.Poppins_Regular
        },
        replyButton: {
            marginBottom: 10
        },
        reply: {
            fontSize: 14,
            color: COLORS.blue,
            fontFamily: FONTS.Poppins_SemiBold
        }
    });
};
