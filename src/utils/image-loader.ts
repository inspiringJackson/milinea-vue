// /src/utils/image-loader.ts
const imageCache = new Map<string, HTMLImageElement>()

export async function loadImage(src : string) : Promise<HTMLImageElement> {
	if (imageCache.has(src)) {
		return imageCache.get(src)!
	}
	return new Promise((resolve, reject) => {
	    const img = new Image()
	    img.onload = () => {
	      imageCache.set(src, img) // 缓存已加载图片
	      resolve(img)
	    }
	    img.onerror = reject
	    img.src = src
	  });
}

export async function getImageDimensions(src : string) : Promise<{ width : number; height : number }> {
	const img = await loadImage(src);
	return {
		width: img.width,
		height: img.height
	};
}