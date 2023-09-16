import { type RouteProp } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import { Button, Input, ScrollView, Text } from '#libs/components/components';
import { SurveyScreenName } from '#libs/enums/enums';
import {
  useAppForm,
  useCallback,
  useFormController,
  useNavigation,
} from '#libs/hooks/hooks';
import { type SurveyNavigationParameterList } from '#libs/types/types';
import {
  getSurveyCategories,
  type SurveyInputDto,
  surveyInputValidationSchema,
} from '#packages/survey/survey';
import {
  DEFAULT_SURVEY_PAYLOAD,
  GOALS_CATEGORIES,
  TEXTAREA_ROWS_COUNT,
} from '#screens/survey/libs/constants';

import { SurveyCategory } from '../components';
import { styles } from './styles';

type GoalsStepProperties = {
  route: RouteProp<SurveyNavigationParameterList, typeof SurveyScreenName.GOAL>;
};

type GoalsStepInitialParameters = {
  setGoalSurvey: (payload: string[]) => void;
};

const GoalsStep: React.FC<GoalsStepProperties> = ({ route }) => {
  const { setGoalSurvey } = route.params as GoalsStepInitialParameters;
  const navigation =
    useNavigation<NativeStackNavigationProp<SurveyNavigationParameterList>>();

  const { control, errors, isValid, handleSubmit } = useAppForm<SurveyInputDto>(
    {
      defaultValues: DEFAULT_SURVEY_PAYLOAD,
      validationSchema: surveyInputValidationSchema,
    },
  );
  const {
    field: { onChange: onCategoryChange, value: categoriesValue },
  } = useFormController({
    name: 'preferences',
    control,
  });
  const hasOther = categoriesValue.includes('Other');

  const handleFieldChange = useCallback(
    (option: string) => {
      if (categoriesValue.includes(option)) {
        onCategoryChange(
          categoriesValue.filter((category) => {
            return category !== option;
          }),
        );

        return;
      }

      onCategoryChange([...categoriesValue, option]);
    },

    [categoriesValue, onCategoryChange],
  );

  const handleSurveySubmit = useCallback(
    (payload: SurveyInputDto) => {
      setGoalSurvey(getSurveyCategories(payload));
    },
    [setGoalSurvey],
  );

  const handleContinue = (): void => {
    navigation.navigate(SurveyScreenName.WORRIES);
    void handleSubmit(handleSurveySubmit)();
  };

  const handleBack = (): void => {
    navigation.navigate(SurveyScreenName.FEELING);
  };

  return (
    <ScrollView
      style={styles.surveyContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.titleText}>
        What do you want to achive with CalmPal?
      </Text>
      {GOALS_CATEGORIES.map((category) => {
        return (
          <SurveyCategory
            key={category}
            onChange={handleFieldChange}
            label={category}
          />
        );
      })}

      {hasOther && (
        <Input
          control={control}
          errors={errors}
          name="other"
          placeholder="Enter your preferences"
          rowsCount={TEXTAREA_ROWS_COUNT}
        />
      )}
      <Button
        label="Continue"
        onPress={handleContinue}
        isDisabled={!isValid}
        type="outlined"
      />
      <Button label="Go back" onPress={handleBack} type="solid" />
    </ScrollView>
  );
};

export { GoalsStep };
