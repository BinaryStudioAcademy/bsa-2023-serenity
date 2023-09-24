import { Button, Radio } from '#libs/components/components.js';
import {
  useAppForm,
  useCallback,
  useEffect,
  useFormController,
} from '#libs/hooks/hooks.js';
import { type MeditationExperienceInputDto } from '#packages/survey/libs/types/types.js';
import { oneAnswerStepInputValidationSchema } from '#packages/survey/survey.js';
import { MEDITATION_EXPERIENCE_CATEGORIES } from '#pages/surveys/libs/constants.js';
import { useSurvey } from '#pages/surveys/libs/hooks/survey.hooks.js';

import styles from '../styles.module.scss';

type Properties = {
  onNextStep: () => void;
  onPreviousStep: () => void;
};

const MeditationExperienceStep: React.FC<Properties> = ({
  onNextStep,
  onPreviousStep,
}) => {
  const { meditationExperience, setMeditationExperience } = useSurvey();

  const { control, isValid, handleSubmit } =
    useAppForm<MeditationExperienceInputDto>({
      defaultValues: { meditationExperience: meditationExperience },
      validationSchema: oneAnswerStepInputValidationSchema,
    });
  const {
    field: { onChange: onCategoryChange },
  } = useFormController({
    name: 'meditationExperience',
    control,
  });

  const handleFieldChange = useCallback(
    (category: string) => {
      return () => {
        setMeditationExperience(category);
      };
    },
    [setMeditationExperience],
  );

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onNextStep)(event_);
    },
    [handleSubmit, onNextStep],
  );

  useEffect(() => {
    onCategoryChange(meditationExperience);
  }, [meditationExperience, onCategoryChange]);

  return (
    <form className={styles['form']} onSubmit={handleFormSubmit}>
      <div className={styles['title']}>
        What is your experience with meditation?
      </div>

      <div className={styles['select']}>
        {MEDITATION_EXPERIENCE_CATEGORIES.map((category) => {
          return (
            <Radio
              control={control}
              name="meditationExperience"
              key={category}
              label={category}
              onChange={handleFieldChange(category)}
              isChecked={meditationExperience === category}
            />
          );
        })}
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

export { MeditationExperienceStep };
