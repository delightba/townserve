import Spinner from "../images/VAyR.gif"

const Loading = ({className}) => {
  return (
    <div className="fixed z-[1000] top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-white p-6 rounded-md shadow-md">
        <img src={Spinner} alt="spinner" className={className} />
      </div>
    </div>
  )
}

export default Loading