import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FiShoppingBag, FiPieChart, } from 'react-icons/fi';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine, RiStockLine } from 'react-icons/ri';
import { MdAttractions, MdLocalParking, MdTheaters, MdStore, MdAirplaneTicket } from 'react-icons/md';
import { AuthContext } from '../contexts/authContext';
import { useStateContext } from '../contexts/ContextProvider';

const links = [
  {
    title: 'Summary',
    links: [
      {
        name: 'summary',
        icon: <FiPieChart />,
        roles: ['Employee'],
      },
    ],
  },
  {
    title: 'Pages',
    links: [
      {
        name: 'purchase-tickets',
        icon: <MdAirplaneTicket />,
        roles: ['Customer'],
      },
      {
        name: 'tickets',
        icon: <MdAirplaneTicket />,
        roles: ['Employee'],
      },
      {
        name: 'attractions',
        icon: <MdAttractions />,
        roles: ['Employee', 'Customer'],
      },
      {
        name: 'shows',
        icon: <MdTheaters />,
        roles: ['Employee', 'Customer'],
      },
      {
        name: 'parking',
        icon: <MdLocalParking />,
        roles: ['Employee', 'Customer'],
      },
      {
        name: 'store',
        icon: <MdStore />,
        roles: ['Employee', 'Customer'],
      },
      {
        name: 'orders',
        icon: <AiOutlineShoppingCart />,
        roles: ['Employee'],
      },
      {
        name: 'visitors',
        icon: <IoMdContacts />,
        roles: ['Employee'],
      },
    ],
  },

];


const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();
  const { currentUser } = useContext(AuthContext);

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <SiShopware /> <span>VOA</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">
            {links

              .map((item) => (
                <div key={item.title}>
                  <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                    {item.title}
                  </p>
                  {item.links.filter((link) => link.roles.includes(currentUser.role))
                    .map((link) => (
                      <NavLink
                        to={`/${link.name}`}
                        key={link.name}
                        onClick={handleCloseSideBar}
                        style={({ isActive }) => ({
                          backgroundColor: isActive ? currentColor : '',
                        })}
                        className={({ isActive }) => (isActive ? activeLink : normalLink)}
                      >
                        {link.icon}
                        <span className="capitalize ">{link.name}</span>
                      </NavLink>
                    ))}
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
