import { Sidebar, Menu, Item, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';

function MySidebar() {
    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <Sidebar>
                <Menu>
                    <MenuItem> Home</MenuItem>
                    <MenuItem> Search</MenuItem>
                </Menu>
            </Sidebar>
        </div>
    );
}

export default MySidebar;