import SideBar from "@/components/Dashboard/SideBar"

const Layout = ({children}) => {
    return (
        <div>
            <div className="flex">
                <SideBar />
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout