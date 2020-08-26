import classnames from 'classnames/bind';
import { Link } from 'dva/router';
import { Icon as AntIcon } from 'antd';
import style from './index.scss';
import { history } from '../../history';

export default ({ to, type, ...other }) => {
  return (
    <Link
      to={to}
      className={classnames.bind(style)('icon', {
        active: history.location.pathname === to,
      })}
      {...other}
    >
      <AntIcon type={type} />
    </Link>
  );
};
