import {
  Button,
  Input,
  InputFile,
  Modal,
} from '#libs/components/components.js';
import { EMPTY_ARRAY_LENGTH } from '#libs/constants/constants.js';
import { DataStatus } from '#libs/enums/enums.js';
import {
  useAppForm,
  useAppSelector,
  useCallback,
  useEffect,
} from '#libs/hooks/hooks.js';
import {
  createMeditationEntryFormValidationSchema,
  type MeditationEntryCreateForm,
  type MeditationEntryCreateRequestDto,
} from '#packages/meditation/meditation.js';
import { DEFAULT_MEDITATION_PAYLOAD } from '#pages/meditation/libs/constants/constants.js';

import styles from './styles.module.scss';

type Properties = {
  reference: React.RefObject<HTMLDialogElement>;
  onSubmit: (payload: MeditationEntryCreateRequestDto) => void;
};

const AddMeditationModal: React.FC<Properties> = ({ reference, onSubmit }) => {
  const { meditationDataStatus } = useAppSelector(({ meditation }) => {
    return {
      meditationDataStatus: meditation.meditationEntriesDataStatus,
    };
  });
  const { control, errors, handleSubmit, reset } =
    useAppForm<MeditationEntryCreateForm>({
      defaultValues: DEFAULT_MEDITATION_PAYLOAD,
      validationSchema: createMeditationEntryFormValidationSchema,
    });

  const hasError = Object.keys(errors).length > EMPTY_ARRAY_LENGTH;
  const isLoading = meditationDataStatus === DataStatus.PENDING;

  useEffect(() => {
    if (meditationDataStatus === DataStatus.FULFILLED) {
      reference.current?.close();
      reset();
    }
  }, [meditationDataStatus, reset, reference]);

  const handleFormSubmit = useCallback(
    (event_: React.FormEvent<HTMLFormElement>) => {
      void handleSubmit(({ name, file }) => {
        onSubmit({ name, file } as MeditationEntryCreateRequestDto);
      })(event_);
    },
    [onSubmit, handleSubmit],
  );

  return (
    <Modal title="Add meditation" reference={reference}>
      <form className={styles['form']} onSubmit={handleFormSubmit}>
        <Input
          control={control}
          errors={errors}
          label="Meditation name"
          name="name"
          placeholder="Enter topic name"
        />
        <InputFile
          control={control}
          errors={errors}
          fileName="file"
          fileTypeName="fileType"
          fileSizeName="fileSize"
          label="Meditation audio file"
          description="Only MP3 extension is allowed"
        />
        <Button
          type="submit"
          label="Submit"
          isLoading={isLoading}
          isDisabled={hasError}
        />
      </form>
    </Modal>
  );
};

export { AddMeditationModal };
