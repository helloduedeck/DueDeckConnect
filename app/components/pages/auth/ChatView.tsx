import {
  FlatList,
  Platform,
  RefreshControl,
  View,
  ViewToken,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Container from '@components/atoms/Container';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {colors} from '@theme';
import Content from '@components/content/Content';
import {useSharedValue} from 'react-native-reanimated';
import EmptyOther from '@components/molecules/empty/EmptyOther';
import {Sublabel} from '@components/atoms/SubLabel';
import CircleImage from '@components/atoms/Circleimage/CircleImage';
import ChatBoxInput from '@components/organisms/ServiceDetails/ChatBoxInput';
import {useGetCommentsMutation, useSendMessageMutation} from '@api/services';
import {toast} from '@utils';
import moment from 'moment';

export interface LabelPropsType {
  name: string;
  text: string;
  time: string;
  direction?: 'left' | 'right';
}

const MessageBubble = ({name, text, direction, time}: LabelPropsType) => {
  console.log('LabelPropsType', time);
  const formatted = moment(time).format('MMM DD, YYYY | h:mm a');

  var rightSpacer =
    direction === 'left' ? (
      <View style={{width: 20, backgroundColor: 'red'}} />
    ) : null;
  if (text)
    return (
      <View style={styles.container}>
        {direction === 'right' && (
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              width: '100%',
              flex: 1,
            }}>
            <View style={styles.chatcontainer(colors.white)}>
              <View style={{marginBottom: 15}}>
                <Sublabel
                  size={'small'}
                  fontWeight={'normal'}
                  fontStyle={'normal'}
                  title={text}
                  color={colors.GRey800}
                  align={undefined}
                  style={{lineHeight: 50}}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  position: 'absolute',
                  bottom: 5,
                  right: 8,
                }}>
                <Sublabel
                  size={'exsmall'}
                  fontWeight={'normal'}
                  fontStyle={'normal'}
                  title={formatted}
                  color={colors.GRey800}
                  align={undefined}
                />
                {/* <Sublabel
                size={'exsmall'}
                fontWeight={'normal'}
                fontStyle={'normal'}
                title={' | 4:35 pm'}
                color={undefined}
                align={undefined}
              /> */}
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                marginLeft: moderateScale(5),
                marginRight: moderateScale(5),
              }}>
              <CircleImage
                size={'small'}
                IsOutlined={true}
                title={name}
                color={colors.white}
                onPress={function (): void {
                  throw new Error('Function not implemented.');
                }}
                backgroundColor={colors.primary}
                source={undefined}
              />

              <Sublabel
                size={'exsmall'}
                fontWeight={'bold'}
                fontStyle={'normal'}
                title={'You'}
                color={colors.GRey800}
                align={undefined}
              />
            </View>
            <View></View>
          </View>
        )}

        {direction === 'left' && (
          <View style={{padding: 10, flexDirection: 'row'}}>
            <View
              style={{
                alignItems: 'center',
                marginLeft: moderateScale(5),
                marginRight: moderateScale(5),
              }}>
              <CircleImage
                size={'small'}
                IsOutlined={true}
                title={name}
                color={colors.white}
                onPress={function (): void {
                  throw new Error('Function not implemented.');
                }}
                backgroundColor={colors.primary}
                source={undefined}
              />
              <View style={{marginTop: 2}}>
                <Sublabel
                  size={'exsmall'}
                  fontWeight={'bold'}
                  fontStyle={'normal'}
                  title={'User'}
                  color={colors.GRey800}
                  align={undefined}
                />
              </View>
            </View>
            <View style={styles.chatcontainer(colors.date)}>
              <View style={{marginBottom: 15}}>
                <Sublabel
                  size={'small'}
                  fontWeight={'normal'}
                  fontStyle={'normal'}
                  title={text}
                  color={colors.GRey800}
                  align={undefined}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  position: 'absolute',
                  bottom: 5,
                  right: 8,
                }}>
                <Sublabel
                  size={'exsmall'}
                  fontWeight={'normal'}
                  fontStyle={'normal'}
                  title={formatted}
                  color={colors.GRey800}
                  align={undefined}
                />
                {/* <Sublabel
                size={'exsmall'}
                fontWeight={'normal'}
                fontStyle={'normal'}
                title={'| 4:35 pm'}
                color={undefined}
                align={undefined}
              /> */}
              </View>
            </View>
          </View>
        )}
        {rightSpacer}
      </View>
    );
};

type IProps = {
  comments: [];
  id: string | number;
  onBack: () => void;
};

const ChatView: React.FC<IProps> = ({comments, id, onBack}) => {
  const [isLoading, setIsLoading] = useState(false);
  const viewableItems = useSharedValue<ViewToken[]>([]);
  const [messages, setMessages] = useState(comments);

  const [sendMessage] = useSendMessageMutation();
  const [getComments] = useGetCommentsMutation();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const onMessageSend = async (message: string) => {
    const reqData: any = {
      message: message,
      task_id: id,
    };
    await sendMessage(reqData)
      .unwrap()
      .then(data => {
        console.log('7894562 ', data);
        if (data?.success) {
          setMessages(data?.data);
          onBack(data?.data);
          //postListSorted(data?.data.sort((a, b) => b - a));
          toast.success(data.message);
        } else {
        }
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch(e => {
        console.log('getServiceDetails ', e);
      });
  };

  const onListRefresh = async () => {
    const reqData: any = {
      task_id: id,
    };

    await getComments(reqData)
      .unwrap()
      .then(data => {
        console.log('7894562 ', data);
        if (data?.success) {
          setMessages(data?.data);
          onBack(data?.data);
          toast.success(data.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch(e => {
        console.log('getServiceDetails ', e);
      });
  };

  const viewableItem = useCallback(({viewableItems: vItems}: any) => {
    viewableItems.value = vItems;
  }, []);

  return (
    <Container isSubLabel={true} backLabel={['Dashboard', 'Notice']}>
      <Content isLoading={isLoading}>
        <>
          <FlatList
            data={messages}
            extraData={messages}
            contentContainerStyle={styles.content}
            onViewableItemsChanged={viewableItem}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={onListRefresh}
              />
            }
            ListEmptyComponent={<EmptyOther navigation={undefined} />}
            keyExtractor={item => `${item.id}`}
            renderItem={({item, index}) =>
              item?.client_comm?.length || item?.internal_comm?.length ? (
                <MessageBubble
                  key={index}
                  direction={item?.usertype_id === 2 ? 'right' : 'left'}
                  text={item?.client_comm ?? item?.internal_comm}
                  name={item?.updated_by_initials}
                  time={item?.updated_at}
                />
              ) : (
                <MessageBubble
                  key={index}
                  direction={item?.usertype_id === 2 ? 'right' : 'left'}
                  text={
                    item?.usertype_id === 2
                      ? item?.client_comm
                      : item?.internal_comm
                  }
                  name={item?.updated_by_initials}
                  time={item?.updated_at}
                />
              )
            }
          />
        </>
        <View style={{marginLeft: 10, marginRight: 10, marginBottom: 15}}>
          <ChatBoxInput
            onSubmit={function (message: string): void {
              onMessageSend(message);
            }}
          />
        </View>
      </Content>
    </Container>
  );
};

const styles = ScaledSheet.create({
  cardcontainer: (color: string) => ({
    paddingTop: moderateScale(0),
    paddingHorizontal: moderateScale(11),
    backgroundColor: color,
    borderRadius: 4,
    margin: moderateScale(10),
  }),
  date: {
    flex: 1,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 15,
    paddingBottom: moderateScale(5),
  },
  messageBubble: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    flex: 1,
    borderEndEndRadius: 78,
  },

  messageBubbleLeft: {
    backgroundColor: '#FFFFFF',
    padding: 5,
    minHeight: 50,
  },

  messageBubbleTextLeft: {
    color: '#585858',
  },
  messageBubbleRight: {
    backgroundColor: '#E1F1F6',
    minHeight: 50,
    padding: 5,
  },
  messageBubbleTextRight: {
    color: '#585858',
  },
  chatcontainer: (color: string) => ({
    paddingHorizontal: 12,
    backgroundColor: color, //colors.date,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    padding: 10,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
    flex: 0.94,
  }),
});

export default ChatView;
