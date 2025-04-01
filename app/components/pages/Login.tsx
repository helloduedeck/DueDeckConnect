import {useGetPostsQuery} from '@api/posts';
import FabButton from '@components/atoms/Buttons/FabButton';
import Loader from '@components/atoms/Loader/Loader';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Label, Sublabel} from '@components/atoms/Labels';
import ButtonComponent from '@components/atoms/Buttons/ButtonComponent';
import Card from '@components/atoms/Card/Card';
import Checkbox from '@components/atoms/CheckBox/CheckBox';
import CheckBoxMolecule from '@components/molecules/CheckBoxMolecule';
import Text from '@components/atoms/Text';
import DashboardContainer from '@components/atoms/DashboardContainer';
import Container from '@components/atoms/Container';
import {colors} from '@theme';
import MenuBoard from '@components/organisms/Dashboard/MenuBoard';
import LeftRightText from '@components/molecules/LeftRightText';
import ServiceBoard from '@components/organisms/Dashboard/ServiceBoard';
import DashhboardHeader from '@components/organisms/Dashboard/DashboardHeader';
import DocumentLabel from '@components/organisms/Dashboard/DocumentLabel';

const Login = () => {
  const {data} = useGetPostsQuery('');
  return (
    <Container>
      {/* <DashboardContainer>
        <DashhboardHeader />
      </DashboardContainer>
      <ServiceBoard/> */}
      <DocumentLabel/>
      <MenuBoard />
      <TouchableOpacity onPress={() => {}}>
        <Text>Login</Text>
        <FabButton size={'small'} background={'red'} />
        <Loader size={120} />
        <LeftRightText leftTitle={'Your service updates'} rightTitle={'View Service'} color={colors.primary} />

        {/* <Sublabel
          size={'small'}
          fontWeight={'bold'}
          fontStyle={'normal'}
          title={'Hello'}
          color={'red'}
          align={'center'}
        />
        <ButtonComponent label={'Hello'} />
        <Card children={<Text>"hello"</Text>} />*/}
      </TouchableOpacity>
      {/* <Checkbox isChecked={false} />
      <CheckBoxMolecule isChecked={false} label={'Hi'} onPress={() => {}} />
      <Text>"hoppppp"</Text>
      <Label>"hoppppp"</Label>  */}
    </Container>
  );
};

export default Login;
