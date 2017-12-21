const env = process.env.NODE_ENV || 'dev';

let fileServerAddr = 'http://image.kmylm.com/store';
if (env === 'dev') {
  fileServerAddr = 'http://image.kmylm.com/store';
} else {
  fileServerAddr = 'http://image.kmylm.com/store';
}

/*
 * size can be : {
 *  full,
 *  large,
 *  thumbnail
 * }
 */

const getImgFromPath = (path, size) => {
  const suffixs = ['png', 'jpg', 'gif', 'jpeg'];
  if(!path){
    return null
  }
  const pathArray = path.split('.');
  const len = pathArray.length;
  const suffix = pathArray[len-1];
  if (suffixs.indexOf(suffix) < 0) {
    return alert("image type error.");
  }

  const replaceIndex = len - 2;
  let realPath = '';
  for(let i = 0; i < len; i++) {
    if (i === replaceIndex) {
      realPath += pathArray[i] + `_${size}.`;
    } else {
      realPath += pathArray[i]
    }
  }
  return `${fileServerAddr}${realPath}`;
};

const cutImgSize = (path) => {
  const sizePrefix = ['_full', '_large', '_thumbnail','_{0}'];
  return path.replace(sizePrefix[0],'')
              .replace(sizePrefix[1],'')
              .replace(sizePrefix[2],'')
              .replace(sizePrefix[3],'');
}
// 转2位小数的金额；
const convertMoney = (money) => {
  if (!money) {
    return ' ¥ 0.00';
  }
  return '¥' + Number(money).toFixed(2);
}
export {
  getImgFromPath,
  cutImgSize,
  convertMoney
};
