import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native'; // Make sure you have expo/vector-icons installed
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../themev1';
import {moderateScale} from 'react-native-size-matters';
import toast from '@utils/toast';

interface ChatBoxProps {
  onSubmit: (message: string) => void;
}
const ChatBoxInput: React.FC<ChatBoxProps> = ({onSubmit}) => {
  const [message, setMessage] = useState<string>('');
  const handleMessageSubmit = () => {
    if (!message) {
      toast.normal('Please enter message to send');
      return;
    }
    if (message.trim() !== '') {
      onSubmit(message);
      setMessage('');
    }
  };
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={message}
        placeholder="Add Comment..."
        style={styles.input}
        maxLength={250}
        onChangeText={newText => setMessage(newText)}
        defaultValue={message}
      />
      <TouchableOpacity style={{marginRight: 10}} onPress={handleMessageSubmit}>
        <Icon name={'send'} size={17} color={colors.primaryDark} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 5,
    padding: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(5),
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: moderateScale(16),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(5),
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: moderateScale(5),
    borderColor: '#CECECE',
  },
});

export default ChatBoxInput;
