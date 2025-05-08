import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {colors} from '../../../themev1';
import CustomHeader from '@components/organisms/Headers/CustomHeader';
import DetailContent from '@components/templates/Details/DetailContent';
import {moderateScale} from 'react-native-size-matters';
import ChatView from '@components/pages/auth/ChatView';
import Container from '@components/atoms/Container';
import CustomHeaderW from '@components/organisms/Headers/CustomHeaderW';

const Comments = ({route, navigation}: any) => {
  const {serviceData, commentsData, taskId, onDataBack} = route.params;

  /**\
   * This function wil get updated comment data from chat view and send back to Service detailed board
   * and update comment page there
   * ,so we will have updated data at both place
   * as we dont have any get api for comments.
   */
  const onCommentDataBack = (data: any) => {
    onDataBack(data);
  };

  const getGStatusColor = (gStatus: string) => {
    switch (gStatus) {
      case 'Overdue':
        return colors.semorange;
      case 'Due':
        return colors.primary;
      case 'Upcoming':
        return colors.SemGreen500;
      default:
        return colors.primary;
    }
  };
  const getHeaderText = (heading: string, length: number) => {
    try {
      return heading.length < length
        ? `${heading}`
        : `${heading.substring(0, length)}..`;
    } catch (error) {
      return '';
    }
  };
  return (
    <Container style={{backgroundColor: colors.Dashboard}}>
      <View style={{height:40,backgroundColor:colors.primary,justifyContent:'center',alignItems:'center'}}>
      <CustomHeaderW title="Comments" />
      </View>

      <View style={{marginVertical: moderateScale(15)}}>
        <DetailContent
          // SubLabelPropsType={{
          //   size: 'exsmall',
          //   fontWeight: 'bold',
          //   fontStyle: 'italic',
          //   title: serviceData?.document_status,
          //   color: colors.SemGreen500,
          //   align: undefined,
          // }}
          LabelPropsType={{
            size: 'medium',
            fontWeight: 'semibold',
            title: getHeaderText(serviceData?.service_name,25),
            color: colors.GRey800,
            align: { undefined },
          }}
          LabelPropsType1={{
            size: 'small',
            fontWeight: 'semibold',
            title: 'ACT :',
            color: colors.GRey800,
            align: { undefined },
          }}
          LabelPropsType2={{
            size: 'small',
            fontWeight: 'normal',
            title: getHeaderText(serviceData?.act_name,25),
            color: colors.GRey800,
            align: { undefined },
          }}
          LabelPropsType3={{
            size: 'small',
            fontWeight: 'normal',
            title: serviceData?.due_date, //'Mar 3, 2024'
            color: colors.GRey800,
            align: { undefined },
          }}
          SubLabelPropsType={{
            size: 'exsmall',
            fontWeight: 'bold',
            fontStyle: 'italic',
            title: serviceData?.due_in,
            color: getGStatusColor(serviceData?.g_status),
            align: undefined,
          }}
          clientName={getHeaderText(serviceData.client_name,25)} SubLabelPropsType1={undefined}        />
      </View>
      <ChatView
        comments={commentsData}
        id={taskId}
        onBack={onCommentDataBack}
      />
    </Container>
  );
};

//TODO: separate these out. This is what happens when you're in a hurry!
const styles = StyleSheet.create({
  //ChatView

  outer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },

  messages: {
    flex: 1,
  },

  //InputBar

  inputBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 3,
  },

  textBox: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },

  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    marginLeft: 5,
    paddingRight: 15,
    borderRadius: 5,
    backgroundColor: '#66db30',
  },
});

export default Comments;
