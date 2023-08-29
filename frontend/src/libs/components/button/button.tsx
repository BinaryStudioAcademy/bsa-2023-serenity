import { type ReactNode } from 'react';

import styles from './styles.module.scss';

type Properties = {
  label?: string;
  type?: 'button' | 'submit';
  children?: ReactNode;
  style?: 'primary' | 'secondary' | 'rounded' | 'rounded-transparent';
  onClick?: () => void;
};

const Button: React.FC<Properties> = ({
  type = 'button',
  label,
  children,
  style = 'primary',
  onClick,
}) => (
  <button type={type} className={styles[style]} onClick={onClick}>
    {label ?? children}
  </button>
);

export { Button };
