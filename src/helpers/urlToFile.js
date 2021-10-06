// url = 'http://192.168.1.3:8080/uploads/317b2342b47be278f6c7b7943d838202.jpg'
// ***Here is the code for converting "image source" (url) to "Base64".***
const toDataURL = url => fetch(url)
.then(response => response.blob())
.then(blob => new Promise((resolve, reject) => {
	const reader = new FileReader()
	reader.onloadend = () => resolve(reader.result)
	reader.onerror = reject
	reader.readAsDataURL(blob)
}))

// ***Here is code for converting "Base64" to javascript "File Object".***
const dataURLtoFile = (dataurl, filename) => {
	var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, { type: mime });
}

export default function urlToFile(url) {
	var fileData;
	// *** Calling both function ***
	toDataURL(url)
		.then(dataUrl => {
			console.log('Here is Base64 Url', dataUrl)
			fileData = dataURLtoFile(dataUrl, "imageName.jpg");
			console.log("Here is JavaScript File Object", fileData)
		})
	return fileData;
}

