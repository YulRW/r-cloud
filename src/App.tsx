import { Button, Image } from 'antd';
import { useState } from 'react';
import { get } from './api';

const filterType = [
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
];

function App() {
  const [imgSrc, setimgSrc] = useState<any>('');

  // https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png

  // let drag = document.getElementById('imgDrag')
  // if(!drag){
  //   drag!.ondrop = ()=>{
  //     console.log(123);

  //   }
  // }

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

  const ignoreDrag = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleBeautify = ()=>{
    get('',{
      Action:'StyleImagePro',
      Version:'2019-12-13',
      Region:'ap-guangzhou',
      FilterType:2,
      url:'https://pic.3gbizhi.com/2020/0826/thumb_1680_0_20200826123917742.jpg'

    }).then(res=>{
      console.log(res,'rrrrr');
      
    })
  }

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
      {filterType.map((n) => (
        <Button key={n.type}>{n.name}</Button>
      ))}
      <Button
        size="large"
        shape="circle"
        style={{ display: 'block' }}
        className="animate-bounce mx-auto mt-10"
        onClick={handleBeautify}
      >
        🔮
      </Button>
    </div>
  );
}

export default App;
