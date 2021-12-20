export const ObjGet = (data, keys=[]) => {
  let targetObj = {}
  Object.keys(data).forEach(function (key) {
    if (keys.includes(key)) targetObj[key] = data[key]
  })
  return targetObj
};

export let dataUrlToFile = (dataUrl) => {
  const binaryString = window.atob(dataUrl.split(',').pop());
  const arrayBuffer = new ArrayBuffer(binaryString.length);
  const intArray = new Uint8Array(arrayBuffer);

  for (let i = 0, j = binaryString.length; i < j; i++) {
    intArray[i] = binaryString.charCodeAt(i);
  }

  const data = [intArray];

  let blob;

  try {
    blob = new Blob(data, { type: 'image/png' });
  } catch (error) {
    window.BlobBuilder = window.BlobBuilder ||
      window.WebKitBlobBuilder ||
      window.MozBlobBuilder ||
      window.MSBlobBuilder;
    if (error.name === 'TypeError' && window.BlobBuilder) {
      const builder = new window.BlobBuilder();
      builder.append(arrayBuffer);
      blob = builder.getBlob('image/png');
    } else {
      console.error('dataUrlToFile failed');
      throw new Error('dataUrlToFile failed');
    }
  }
  const fileOfBlob = new File([blob], Date.now() + '.png' );

  return fileOfBlob;
}
