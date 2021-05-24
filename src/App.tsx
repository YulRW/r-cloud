import { Button, Image } from 'antd';
import { useState } from 'react';
function App() {
  const [imgSrc, setimgSrc] = useState("https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png");
  return (
    <div>
      <Image
        width={200}
        src={imgSrc}
      />
      <Button>123</Button>
    </div>
  );
}

export default App;
