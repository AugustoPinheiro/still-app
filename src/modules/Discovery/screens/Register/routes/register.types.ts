export type RegisterStackParamList = {
  RegisterUser: { isCreateProfile?: boolean };
  RegisterUserUsername: { isCreateProfile?: boolean };
  RegisterUserPassword: { isCreateProfile?: boolean };
  RegisterUserPhoto: { isCreateProfile?: boolean };
  SuccessRegisterUser: { isCreateProfile?: boolean };

  RegisterProfessional: { isCreateProfile?: boolean };
  RegisterProfessionalUsername: { isCreateProfile?: boolean };
  RegisterProfessionalPassword: { isCreateProfile?: boolean };
  SuccessRegisterProfessional: { isCreateProfile?: boolean };

  RegisterCompany: { isCreateProfile?: boolean };
  RegisterCompanyUsername: { isCreateProfile?: boolean };
  RegisterCompanyPassword: { isCreateProfile?: boolean };
  SuccessRegisterCompany: { isCreateProfile?: boolean };
};
