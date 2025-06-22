import { Clipboard, HomeIcon, User, } from "lucide-react";
import React from "react";

export type TMenuList = {
    href: string,
    icon: React.JSX.Element,
    label: string,
    add?: string | number
}

export const linkAdmin: TMenuList[] = [
    // {
    //     href: '/admin/dashboard',
    //     icon: <HomeIcon className={'flex-shrink-0 w-5 h-5  transition duration-75 '}/>,
    //     label: 'Dashboard',
    //     // add: 'pro'
    // },
    {
        href: '/admin/employee',
        icon: <User className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' } />,
        label: 'Employee',
    },

    // {
    //     href: '/admin/registration',
    //     icon: <Inbox className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' } />,
    //     label: 'Registration',
    // },

    // {
    //     href: '/admin/send',
    //     icon: <SendHorizontal className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' } />,
    //     label: 'Send Email',
    // },

    // {
    //     href: '/admin/interview',
    //     icon: <Speech className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' }/>,
    //     label: 'Interview',
    // },

    // {
    //     href: '/admin/position',
    //     icon: <Factory className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' }/>,
    //     label: 'Position',
    // },

    // {
    //     href: '/admin/account',
    //     icon: <PersonStanding className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' }/>,
    //     title: 'Account',
    // },

    // {
    //     href: '/admin/positions',
    //     icon: <Waypoints className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' }/>,
    //     title: 'Position',
    // },
    // {
    //     href: '/admin/company',
    //     icon: <Building2 className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' }/>,
    //     label: 'Company',
    // },

]

export const linkUser: TMenuList[] = [
    {
        href: '/user',
        icon: <HomeIcon className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' } />,
        label: 'Home',
    },

    {
        href: '/registration',
        icon: <User className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' } />,
        label: 'Registration',
    },

    {
        href: '/interview',
        icon: <Clipboard className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' } />,
        label: 'Interview',
    },

    // {
    //     href: '/accept',
    //     icon: <ClipboardCheck className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' }/>,
    //     label: 'Accept',
    // },

    // {
    //     href: '/print',
    //     icon: <Printer className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' }/>,
    //     label: 'Print',
    // },

]
