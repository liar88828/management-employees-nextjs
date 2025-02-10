import {
    Apple,
    BookA,
    CakeSlice,
    Car,
    CreditCard,
    GlassWater,
    GraduationCap,
    HandPlatter,
    HomeIcon,
    LucidePackageSearch,
    PcCase, Printer,
    User,
    UserIcon,
} from "lucide-react";
import React from "react";

export const categoryData = [
    {title: 'Drink', icon: <GlassWater/>},
    {title: 'Fruit', icon: <Apple/>},
    {title: 'Cake', icon: <CakeSlice/>},
    {title: 'Electronic', icon: <PcCase/>},
    {title: 'School', icon: <GraduationCap/>},
]

export const menuData = [
    {
        title: 'Product',
        icon: <LucidePackageSearch/>,
        href: '/product'
    },
    {
        title: 'Profile',
        icon: <UserIcon/>,
        href: '/profile',
    },
]

export const menuUser = [
    {
        title: 'Home',
        icon: <HomeIcon/>,
        href: '/home'
    },
    {
        title: 'Product',
        icon: <LucidePackageSearch/>,
        href: '/product'
    },
    {
        title: 'Profile',
        icon: <UserIcon/>,
        href: '/profile',
    },
]
export type TMenuList = {
    href: string,
    icon: React.JSX.Element,
    label: string,
    add?: string | number
}
export const linkPrimary: TMenuList[] = [
    {
        href: '/admin/dashboard',
        icon: <HomeIcon className={'flex-shrink-0 w-5 h-5  transition duration-75 '}/>,
        label: 'Dashboard',
        // add: 'pro'
    },
    {
        href: '/admin/employee',
        icon: <User className={'flex-shrink-0 w-5 h-5  transition duration-75 '}/>,
        label: 'Employee',
    },
]

export const linkUser: TMenuList[] = [
    {
        href: '/home',
        icon: <HomeIcon className={'flex-shrink-0 w-5 h-5  transition duration-75 '}/>,
        label: 'Home',
    },


    {
        href: '/employee/register',
        icon: <User className={'flex-shrink-0 w-5 h-5  transition duration-75 '}/>,
        label: 'Register',
    },


    {
        href: '/employee/print',
        icon: <Printer className={'flex-shrink-0 w-5 h-5  transition duration-75 '}/>,
        label: 'Print',
    },

]

