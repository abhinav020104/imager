import { Button } from "../../../@#/components/ui/button"

const NavBar = () => {
  return (
    <div className="w-screen h-[80px] bg-gray-900 flex px-4 fixed z-50 justify-center shadow-md">
      <div className="w-11/12 h-full flex justify-between items-center">
        <div className="text-white text-2xl font-bold cursor-pointer">Pixel</div>
        <div className="flex gap-4">
          <Button variant="ghost" className="text-white text-lg hover:bg-gray-200 cursor-pointer">
            Home
          </Button>
          <Button variant="ghost" className="text-white text-lg hover:bg-gray-200 cursor-pointer">
            Train
          </Button>
          <Button variant="ghost" className="text-white text-lg hover:bg-gray-200 cursor-pointer">
            Gallery
          </Button>
          <Button variant="default" className="text-lg bg-blue-600 hover:bg-blue-700 cursor-pointer">
            Login
          </Button>
          <Button variant="default" className="text-lg bg-green-500 hover:bg-green-700 cursor-pointer">
            Signup
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NavBar
