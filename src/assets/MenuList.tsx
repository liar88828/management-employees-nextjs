import {
    Apple,
    Building2,
    CakeSlice,
    Factory,
    GlassWater,
    GraduationCap,
    HomeIcon,
    IdCard,
    Inbox,
    LucidePackageSearch,
    MailOpen,
    NotepadText,
    PcCase,
    PersonStanding,
    SendHorizontal,
    User,
    UserIcon,
    Waypoints,
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

export const linkAdmin: TMenuList[] = [
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

    {
        href: '/admin/position',
        icon: <Factory className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' }/>,
        label: 'Position',
    },

    {
        href: '/admin/account',
        icon: <PersonStanding className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' }/>,
        label: 'Account',
    },
    {
        href: '/admin/inbox',
        icon: <Inbox className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' }/>,
        label: 'Inbox',
    },
    {
        href: '/admin/send',
        icon: <SendHorizontal className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' }/>,
        label: 'Send Email',
    },

    {
        href: '/admin/department',
        icon: <Waypoints className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' }/>,
        label: 'Department',
    },
    {
        href: '/admin/company',
        icon: <Building2 className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' }/>,
        label: 'Company',
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
        href: '/employee/cv',
        icon: <NotepadText className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' }/>,
        label: 'CV',
    },

    {
        href: '/employee/card',
        icon: <IdCard className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' }/>,
        label: 'ID-Card',
    },

    {
        href: '/employee/letter',
        icon: <MailOpen className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' }/>,
        label: 'Letter',
    },

]

