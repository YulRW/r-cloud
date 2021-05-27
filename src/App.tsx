import { Button, Image, Radio, Tooltip } from 'antd';
import React, { useState } from 'react';
import { get, post } from './api';

// 滤镜数据
const filterTypeArr = [
  { type: 1, name: '白茶' },
  { type: 2, name: '白皙' },
  { type: 3, name: '初夏' },
  { type: 4, name: '东京' },
  { type: 5, name: '告白' },
  { type: 6, name: '暖阳' },
  { type: 7, name: '蔷薇' },
  { type: 8, name: '清澄' },
  { type: 9, name: '清透' },
  { type: 10, name: '甜薄荷' },
  { type: 11, name: '默认' },
  { type: 12, name: '心动' },
  { type: 13, name: '哑灰' },
  { type: 14, name: '樱桃布丁' },
  { type: 15, name: '自然' },
  { type: 16, name: '清逸' },
  { type: 17, name: '黑白' },
  { type: 18, name: '水果' },
  { type: 19, name: '爱情' },
  { type: 20, name: '冬日' },
  { type: 21, name: '相片' },
  { type: 22, name: '夏日' },
  { type: 23, name: '香氛' },
  { type: 24, name: '魅惑' },
  { type: 25, name: '悸动' },
  { type: 26, name: '沙滩' },
  { type: 27, name: '街拍' },
  { type: 28, name: '甜美' },
  { type: 29, name: '初吻' },
  { type: 30, name: '午后' },
  { type: 31, name: '活力' },
  { type: 32, name: '朦胧' },
  { type: 33, name: '悦动' },
  { type: 34, name: '时尚' },
  { type: 35, name: '气泡' },
  { type: 36, name: '柠檬' },
  { type: 37, name: '棉花糖' },
  { type: 38, name: '小溪' },
  { type: 39, name: '丽人' },
  { type: 40, name: '咖啡' },
  { type: 41, name: '嫩芽' },
  { type: 42, name: '热情' },
  { type: 43, name: '渐暖' },
  { type: 44, name: '早餐' },
  { type: 45, name: '白茶' },
  { type: 46, name: '白嫩' },
  { type: 47, name: '圣代' },
  { type: 48, name: '森林' },
  { type: 49, name: '冲浪' },
  { type: 50, name: '奶咖' },
  { type: 51, name: '清澈' },
  { type: 52, name: '微风' },
  { type: 53, name: '日落' },
  { type: 54, name: '水光' },
  { type: 55, name: '日系' },
  { type: 56, name: '星光' },
  { type: 57, name: '阳光' },
  { type: 58, name: '落叶' },
  { type: 59, name: '生机' },
  { type: 60, name: '甜心' },
  { type: 61, name: '清逸' },
  { type: 62, name: '春意' },
  { type: 63, name: '罗马' },
  { type: 64, name: '青涩' },
  { type: 65, name: '清风' },
  { type: 66, name: '暖心' },
  { type: 67, name: '海水' },
  { type: 68, name: '神秘' },
  { type: 69, name: '旧调1' },
  { type: 70, name: '旧调2' },
  { type: 71, name: '雪顶' },
  { type: 72, name: '日光' },
  { type: 73, name: '浮云' },
  { type: 74, name: '流彩' },
  { type: 75, name: '胶片' },
  { type: 76, name: '回味' },
  { type: 77, name: '奶酪' },
  { type: 78, name: '蝴蝶' },
];

// 随机十六进制代码, eg: #ff0000
function randomColor(){
	return '#'+Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0');
}

function App() {
  const [imgSrc, setimgSrc] = useState<any>('');
  const [filterType, setfilterType] = useState(1);

  // 拖拽完图片后处理
  const handleDrop = (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    //取得拖进来的文件
    let data = e.dataTransfer;
    let file = data.files[0];

    //创建FileReader
    let reader = new FileReader();
    //告诉它在准备好数据之后做什么
    reader.onload = function (e) {
      //使用图像URL来绘制dropBox的背景
      setimgSrc(e.target!.result);
    };
    //读取图片
    reader.readAsDataURL(file);
  };

  // 忽略其他事件
  const ignoreDrag = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
  };

  // 美妆图片
  const handleBeautify = () => {
    post('/beautify', {
      FilterType: filterType,
      Image: imgSrc,
      RspImgType: 'base64',
    }).then((res: any) => {
      console.log(res, 'rrrrr');
      setimgSrc('data:image/png;base64,' + res.data.ResultImage);
    });
  };

  return (
    <div>
      <div
        id="imgDrag"
        className="w-64 h-64 mx-auto shadow-md my-4 flex justify-center items-center hover:shadow-2xl"
        onDrop={handleDrop}
        onDragEnter={ignoreDrag}
        onDragOver={ignoreDrag}
      >
        {imgSrc ? <Image width={500} src={imgSrc} /> : '请上传图片'}
      </div>
      滤镜效果：
      <Radio.Group onChange={(e) => setfilterType(e.target.value)} defaultValue={1}>
        {filterTypeArr.map((n) => (
          <Radio.Button value={n.type} key={n.type} style={{backgroundColor:randomColor()}}>{n.name}</Radio.Button>
        ))}
      </Radio.Group>
      <Tooltip title="一键美妆！" color='pink'>
        <Button
          size="large"
          shape="circle"
          style={{ display: 'block' }}
          className="animate-bounce mx-auto mt-10"
          onClick={handleBeautify}
        >
          🔮
        </Button>
      </Tooltip>
    </div>
  );
}

export default App;
