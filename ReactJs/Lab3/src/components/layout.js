import { Outlet, Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import Title from "./title";
function Layout() {
    return (
        <div>
            <Title />
            <Sidebar>
                <Menu>
                    <MenuItem>
                        <Link to="/">Home</Link>
                    </MenuItem>
                    <MenuItem> <Link to="/search">Search</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/nothing-here">Nothing Here</Link>
                    </MenuItem>
                </Menu>
            </Sidebar>
            <hr />
            <Outlet />
        </div>

    );
}

export default Layout;