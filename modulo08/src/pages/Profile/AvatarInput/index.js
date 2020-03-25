import React, { useState, useRef, useEffect } from 'react';

import api from '~/services/api';

import constants from '~/config/Constants';

import { useField } from '@rocketseat/unform';
import { Container } from './styles';

export default function AvatarInput() {
  const { defaultValue, registerField } = useField('avatar');
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.avatar', //ele não explica na aula, mas este path é por onde o unform vai conseguir pegar a variável name, ou seja, será populado o name avatar_id pelo que houver no campo data-avatar
      });
    }
  }, [ref, registerField]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img src={preview || constants.defaultImageProfile} alt="" />

        <input
          type="file"
          id="avatar"
          accept="image/*"
          onChange={handleChange}
          data-avatar={file}
          ref={ref}
        />
      </label>
    </Container>
  );
}
