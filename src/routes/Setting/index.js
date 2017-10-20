import { connect } from 'dva';
import { View, Back, Button, Checkbox, Input, Message } from '../../components';
import { setCookie } from '../../utils/cookie';
import { Component } from 'react';
import style from './index.scss';

const { Header, Content, Bar, Footer, Split } = View;
const State = state => ({
  setting: state.setting,
});

class Overlay extends Component {
  state = {
    key: 0,
    name: this.props.setting.name,
    nameActive: this.props.setting.nameActive,
    img: this.props.setting.img,
    imgActive: this.props.setting.imgActive,
    graphTime: this.props.setting.graphTime,
    graphTimeActive: this.props.setting.graphTimeActive,
    miniTime: this.props.setting.miniTime,
    miniTimeActive: this.props.setting.miniTimeActive,
    uiScale: this.props.setting.uiScale,
    uiScaleActive: this.props.setting.uiScaleActive,
  };

  inputOnChange = (e, name, isNumber) => {
    let { value } = e.target;
    if (isNumber) value = parseFloat(value);
    if (!value) {
      Message.error('数值错误');
    } else {
      this.setState({ [name]: value });
    }
  };

  checkboxOnChange = (e, name) => {
    const { checked } = e.target;
    this.setState({ [name]: checked });
  };

  onDefault = () => {
    const Default = {
      key: this.state.key + 1,
      name: this.props.setting.nameDefault,
      nameActive: false,
      img: this.props.setting.imgDefault,
      imgActive: false,
      graphTime: this.props.setting.graphTimeDefault,
      graphTimeActive: false,
      miniTime: this.props.setting.miniTimeDefault,
      miniTimeActive: false,
      uiScale: this.props.setting.uiScaleDefault,
      uiScaleActive: false,
    };
    this.setState(Default);
    Message.success('重置成功');
  };

  onSave = () => {
    this.props.dispatch({ type: 'setting/update', payload: this.state });
    setCookie('setting', this.state);
    Message.success('保存成功');
  };

  render() {
    const {
      key,
      name,
      nameActive,
      img,
      imgActive,
      graphTime,
      graphTimeActive,
      miniTime,
      miniTimeActive,
      uiScale,
      uiScaleActive,
    } = this.state;
    return [
      <Header key="header">设置</Header>,
      <Bar key="bar" className={style.bar}>
        基础设置
      </Bar>,
      <Content key={key} className={style.content}>
        <div className={style.body}>
          <div className={style.title}>个人</div>
          <Checkbox
            title="自定义昵称"
            defaultChecked={nameActive}
            onChange={e => this.checkboxOnChange(e, 'nameActive')}
          >
            <Input defaultValue={name} onChange={e => this.inputOnChange(e, 'name')} />
          </Checkbox>
          <Checkbox
            title="自定义头像"
            defaultChecked={imgActive}
            onChange={e => this.checkboxOnChange(e, 'imgActive')}
          >
            <Input
              defaultValue={img}
              placeholder={'图片网址'}
              onChange={e => this.inputOnChange(e, 'img')}
            />
          </Checkbox>
          <br />
          <div className={style.title}>常规</div>
          <Checkbox
            title="图表统计时长(秒)"
            defaultChecked={graphTimeActive}
            onChange={e => this.checkboxOnChange(e, 'graphTimeActive')}
          >
            <Input
              defaultValue={graphTime}
              onChange={e => this.inputOnChange(e, 'graphTime', true)}
            />
          </Checkbox>
          <Checkbox
            title="自动折叠(秒)"
            defaultChecked={miniTimeActive}
            onChange={e => this.checkboxOnChange(e, 'miniTimeActive')}
          >
            <Input
              defaultValue={miniTime}
              onChange={e => this.inputOnChange(e, 'miniTime', true)}
            />
          </Checkbox>
          <Checkbox
            title="UI缩放(倍)"
            defaultChecked={uiScaleActive}
            onChange={e => this.checkboxOnChange(e, 'uiScaleActive')}
          >
            <Input defaultValue={uiScale} onChange={e => this.inputOnChange(e, 'uiScale', true)} />
          </Checkbox>
        </div>
        <div className={style.btngroup}>
          <Button onClick={this.onDefault}>恢复默认</Button>
          <Button onClick={this.onSave}>保存</Button>
        </div>
      </Content>,
      <Split key="split" />,
      <Footer key="footer">
        <Back />
      </Footer>,
    ];
  }
}

export default connect(State)(Overlay);