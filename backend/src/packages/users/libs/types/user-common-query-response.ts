type UserCommonQueryResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  passwordSalt: string;
  passwordHash: string;
  details?: {
    fullName: string;
    isSurveyCompleted: boolean;
  };
};

export { type UserCommonQueryResponse };
