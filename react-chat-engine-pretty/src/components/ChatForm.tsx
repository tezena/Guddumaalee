import React, { CSSProperties, useRef, useEffect, useState } from 'react';

import axios from 'axios';

import { PersonObject } from 'react-chat-engine-advanced';

import { PlusOutlined } from '@ant-design/icons';

import Select from 'react-select';

export interface OptionType {
  value: string;
  label: string;
}

interface ChatFormProps {
  projectId: string;
  username: string;
  secret: string;
  onChange: (users: OptionType[]) => void;
  onCancel: () => void;
}

const ChatForm = (props: ChatFormProps) => {
  const didMountRef = useRef(false);
  const [options, setOptions] = useState<OptionType[]>([]);
  const [selected, setSelected] = useState<OptionType[]>([]);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      getAllUsers(
        users => {
          const otherUsers = users.filter(
            user => user.username !== props.username
          );
          const options = otherUsers.map(user => {
            return {
              value: JSON.stringify(user),
              label: `${user.first_name} ${user.last_name}`,
            };
          });
          setOptions(options);
        },
        () => console.log('oops!')
      );
    }
  });

  const getAllUsers = (
    onSuccess: (data: PersonObject[]) => void,
    onError: () => void
  ) => {
    axios
      .get('https://api.chatengine.io/users/search/', {
        headers: {
          'Project-ID': props.projectId,
          'User-Name': props.username,
          'User-Secret': props.secret,
        },
      })
      .then(r => onSuccess(r.data))
      .catch(() => onError);
  };

  return (
    <div className="ce-custom-chat-form" style={styles.chatForm}>
      <Select
        options={options}
        autoFocus={true}
        isMulti={true}
        onChange={users => {
          setSelected(users as OptionType[]);
          props.onChange(users as OptionType[]);
        }}
        styles={customStyles}
        placeholder="Search for users..."
      />

      <button
        className="ce-create-chat-button"
        style={{
          ...styles.createChatButton,
          ...(selected.length === 0 && styles.createChatButtonDisabled),
        }}
        onClick={props.onCancel}
        disabled={selected.length === 0}
      >
        <PlusOutlined />
      </button>

      <style>{`.ce-create-chat-button:hover { background-color: #7b3bc8; }`}</style>
    </div>
  );
};

interface StateType {
  isFocused: boolean;
}

const customStyles = {
  container: () => ({
    width: 'calc(100% - 12px - 12px - 38px - 4px)',
    marginLeft: '12px',
    marginTop: '26px',
  }),
  control: (provided: object) => ({
    ...provided,
    outline: 'none',
    fontFamily: 'Avenir',
    color: 'black',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid rgb(123, 59, 153)',
    boxShadow: 'rgb(123, 59, 180 / 35%) 0px 2px 7px',
  }),
  input: (provided: object) => ({
    ...provided,
    color: 'black',
  }),
  placeholder: (provided: object) => ({
    ...provided,
    color: 'rgb(197, 197, 197)',
  }),
  option: (provided: object, state: StateType) => ({
    ...provided,
    fontFamily: 'Avenir',
    color: 'rgb(197, 197, 197)',
    backgroundColor: state.isFocused ? 'rgb(242, 242, 242)' : 'white',
  }),
  noOptionsMessage: (provided: object) => ({
    ...provided,
    fontFamily: 'Avenir',
  }),
  menu: (provided: object) => ({
    ...provided,
    width: 'calc(100% - 12px - 12px - 38px - 4px)',
    backgroundColor: 'white',
  }),
};

const styles = {
  chatForm: {
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    height: '86px',
  } as CSSProperties,
  createChatButton: {
    width: '38px',
    height: '38px',
    position: 'absolute',
    right: '12px',
    top: '26px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.44s ease',
    outline: 'none',
    backgroundColor: 'rgb(123, 59, 153)',
    border: '1px solid rgb(123, 59, 153)',
    fontSize: '18px',
    color: 'white',
    boxShadow: 'rgba(123, 59, 153, 0.35) 0px 5px 15px',
  } as CSSProperties,
  createChatButtonDisabled: {
    cursor: 'not-allowed',
    color: 'white',
    backgroundColor: '#7b3bc8',
    border: '1px solid #7b3bc8',
    boxShadow: 'none',
  } as CSSProperties,
};

export default ChatForm;
