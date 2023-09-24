import { Button, Checkbox, Input } from '#libs/components/components.js';
import { FIRST_INDEX } from '#libs/constants/index.constant.js';
import {
  useAppForm,
  useAppSelector,
  useCallback,
  useFormController,
} from '#libs/hooks/hooks.js';
import { type GoalInputDto } from '#packages/survey/libs/types/types.js';
import {
  stepWithOtherInputValidationSchema,
  SurveyValidationRule,
} from '#packages/survey/survey.js';
import {
  GOALS_CATEGORIES,
  TEXTAREA_ROWS_COUNT,
} from '#pages/surveys/libs/constants.js';

import styles from '../styles.module.scss';

type OnOther = {
  getOtherDefault: (categories: string[]) => string;
  getOthersCategories: (categories: string[], payload: string[]) => string[];
  hasOther: (category: string[]) => boolean;
};

type Properties = {
  onNextStep: () => void;
  onPreviousStep: () => void;
  onSetGoals: (goals: string[]) => void;
  onOther: OnOther;
};

const GoalsStep: React.FC<Properties> = ({
  onNextStep,
  onSetGoals,
  onPreviousStep,
  onOther,
}) => {
  const { getOtherDefault, getOthersCategories, hasOther } = onOther;

  const goals = useAppSelector((state) => {
    return state.survey.goals;
  });
  const { control, errors, isValid, handleSubmit } = useAppForm<GoalInputDto>({
    defaultValues: { goals: goals, other: getOtherDefault(goals) },
    validationSchema: stepWithOtherInputValidationSchema,
  });

  const {
    field: { onChange: onCategoryChange, value: categoriesValue },
  } = useFormController({
    name: 'goals',
    control,
  });

  const handleFieldChange = useCallback(
    (category: string) => {
      return () => {
        const otherCategories = getOthersCategories(
          GOALS_CATEGORIES,
          categoriesValue,
        );
        if (category === 'Other' && otherCategories.length > FIRST_INDEX) {
          otherCategories.push(category);
          onCategoryChange(
            categoriesValue.filter((option) => {
              return !otherCategories.includes(option);
            }),
          );
          onSetGoals(
            goals.filter((option) => {
              return !otherCategories.includes(option);
            }),
          );

          return;
        }

        if (categoriesValue.includes(category)) {
          onCategoryChange(
            categoriesValue.filter((option) => {
              return option !== category;
            }),
          );
          onSetGoals(
            goals.filter((option) => {
              return option !== category;
            }),
          );

          return;
        }

        onSetGoals([...goals, category]);
        onCategoryChange([...categoriesValue, category]);
      };
    },
    [categoriesValue, getOthersCategories, goals, onCategoryChange, onSetGoals],
  );

  const handleGoalsSubmit = useCallback(
    (payload: GoalInputDto) => {
      if (payload.other) {
        payload.goals.push(payload.other);
        onSetGoals(payload.goals);
      } else {
        onSetGoals(payload.goals);
      }

      onNextStep();
    },
    [onNextStep, onSetGoals],
  );

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(handleGoalsSubmit)(event_);
    },
    [handleSubmit, handleGoalsSubmit],
  );

  return (
    <form className={styles['form']} onSubmit={handleFormSubmit}>
      <div className={styles['title']}>
        What do you want to achieve with this Serenity?
      </div>

      <div className={styles['select']}>
        {GOALS_CATEGORIES.map((category) => {
          return (
            <Checkbox
              control={control}
              name="goals"
              key={category}
              label={category}
              isChecked={categoriesValue.includes(category)}
              onChange={handleFieldChange(category)}
            />
          );
        })}
        {hasOther(goals) && (
          <Input
            control={control}
            errors={errors}
            name="other"
            placeholder="Text"
            maxLength={SurveyValidationRule.MAXIMUM_PREFERENCE_ITEM_LENGTH}
            rowsCount={TEXTAREA_ROWS_COUNT}
            defaultValue={getOtherDefault(goals)}
          />
        )}
      </div>

      <Button
        type="submit"
        label="Continue"
        style="secondary"
        isDisabled={!isValid}
      />

      <Button label="Back" style="outlined" onClick={onPreviousStep} />
    </form>
  );
};

export { GoalsStep };