
export default function Images({images}: {images: string[]}) {
  const imageArray = images.map(image => {
    return (
      <img
              className="w-56 h-44 mr-1 mb-1"
              src={image}
              alt=""
            />
    )
  })
  const len = imageArray.length;
  return (
    <div>
          <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
            {`${len} ${len <= 1 ? "photo" : "photos"}`}
          </h1>
          <div className="flex flex-wrap">
            {imageArray}
          </div>
        </div>
  )
}
