import * as React from 'react';
// TODO: удалить для чистки зависимостей
import classNames from 'classnames/bind';
import styles from './styles.scss';

export type ButtonVariants = 'outline' | 'text' | 'icon' | 'contained';
export type ButtonSizes = 'large' | 'normal' | 'fit';
export type ButtonThemes = 'light' | 'dark';
export type ButtonColors = 'primary' | 'dangerous' | 'default';

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: ButtonVariants
  size?: ButtonSizes;
  theme?: ButtonThemes;
  colors?: ButtonColors;
};

const cx = classNames.bind(styles);

export const Button: React.FC<Props> = ({
  children,
  className = '',
  variant = 'contained',
  size = 'normal',
  theme = 'light',
  colors = 'default',
  type = 'button',
  ...props
}) => (
  <button
    className={cx('button', {
      'button--large': size === 'large',
      'button--fit': size === 'fit',
      'button--primary': colors === 'primary',
      'button--dangerous': colors === 'dangerous',
      'button--default': colors === 'default',
      'ctx-dark': theme === 'dark',
      'button--contained': variant === 'contained',
      'button--outline': variant === 'outline',
      'button--text': variant === 'text',
      'button--icon': variant === 'icon',
    }, className)}
    type={type}
    {...props}
  >
    {children}
  </button>
);
