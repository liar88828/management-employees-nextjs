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
    PcCase,
    User,
    UserIcon
} from "lucide-react";
import React from "react";

export const categoryData = [
    { title: 'Drink', icon: <GlassWater /> },
    { title: 'Fruit', icon: <Apple /> },
    { title: 'Cake', icon: <CakeSlice /> },
    { title: 'Electronic', icon: <PcCase /> },
    { title: 'School', icon: <GraduationCap /> },
]

export const menuData = [
    {
        title: 'Product',
        icon: <LucidePackageSearch />,
        href: '/product'
    },
    {
        title: 'Profile',
        icon: <UserIcon />,
        href: '/profile',
    },
]

export const menuUser = [
    {
        title: 'Home',
        icon: <HomeIcon />,
        href: '/home'
    },
    {
        title: 'Product',
        icon: <LucidePackageSearch />,
        href: '/product'
    },
    {
        title: 'Profile',
        icon: <UserIcon />,
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
        icon: <HomeIcon className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' } />,
        label: 'Dashboard',
        // add: 'pro'
    },
    {
        href: '/admin/employee',
        icon: <User className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' } />,
        label: 'Employee',
    },
]

export const linkSecondary: TMenuList[] = [
    {
        href: '/admin/order',
        icon: <BookA className={ 'flex-shrink-0 w-5 h-5  transition duration-75  ' } />,
        label: 'Order',
        // add: 2
    },
    {
        href: '/admin/product',
        icon: <LucidePackageSearch className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' } />,
        label: 'Product'
    },
    {
        href: '/admin/delivery',
        icon: <Car className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' } />,
        label: 'Delivery'
    },
    {
        href: '/admin/payment',
        icon: <CreditCard className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' } />,
        label: 'Payment'
    },

    {
        href: '/admin/testimonial',
        icon: <HandPlatter className={ 'flex-shrink-0 w-5 h-5  transition duration-75 ' }/>,
        label: 'Testimonial'
    },

]
