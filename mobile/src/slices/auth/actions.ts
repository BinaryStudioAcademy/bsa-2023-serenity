import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '#libs/types/types';
import {
  type UserDetailsDto,
  type UserSignUpRequestDto,
} from '#packages/users/users';

import { name as sliceName } from './auth.slice';

const signUp = createAsyncThunk<
  UserDetailsDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-up`, async (signUpPayload, { extra }) => {
  const { authApi, storage } = extra;
  const { user, token } = await authApi.signUp(signUpPayload);
  await storage.set('token', token);
  return user;
});

export { signUp };
