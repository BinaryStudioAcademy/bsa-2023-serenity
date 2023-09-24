import { useFormController } from '#libs/hooks/hooks.js';
import {
  type FormControl,
  type FormFieldPath,
  type FormFieldValues,
} from '#libs/types/types.js';

import styles from './styles.module.scss';

type Properties<T extends FormFieldValues> = {
  control: FormControl<T, null>;
  label: string;
  name: FormFieldPath<T>;
  onChange: () => void;
  isChecked?: boolean;
};

const Checkbox = <T extends FormFieldValues>({
  control,
  label,
  name,
  onChange,
  isChecked,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  return (
    <label>
      <input
        {...field}
        name={name}
        className={styles['checkbox']}
        type="checkbox"
        onChange={onChange}
        checked={isChecked}
      />
      <div className={styles['container']}>
        <span className={styles['label']}>{label}</span>
      </div>
    </label>
  );
};

export { Checkbox };
