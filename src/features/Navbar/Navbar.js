import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCartItems } from '../cart/cartSlice'
import { selectLoggedUserInfo } from '../User/userSlice'

const navigation = [
  { name: 'Home', href: '/', user: true, admin:true},
  { name: 'Admin', href: '/admin', admin: true}
]
const userNavigation = [
  { name: 'Your Profile', href: '/user-profile', user: true, admin: true },
  { name: 'My Orders', href: '/user-order', user: true },
  { name: 'Orders', href: '/admin/orders', admin: true },
  { name: 'Sign out', href: '/logout', user: true, admin: true },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({ children }) {
  const items = useSelector(selectCartItems)
  const user = useSelector(selectLoggedUserInfo)

  return (
    <>
      {user && <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img 
                        className='h-8 w-8' 
                        alt="svgImg" 
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCI+CjxwYXRoIGZpbGw9IiNmMjYzMjIiIGQ9Ik0xNy4xNzIsMTIuNTcxYy0wLjEyNi0yLjc2MywxLjk4MS02LjI0LDQuNDk0LTcuNDRjMC42MTctMC4yOTUsMS4yNzMtMC41MzMsMS45NTUtMC41OTMgYzEuNzc3LTAuMTU3LDMuNDU1LDAuOTE3LDQuNjI3LDIuMjUyYzEuMjQ0LDEuNDE3LDIuMDksNC4xNzUsMi40Miw2LjAyNWMtMy4xMTItMC40LTQuODEtMC4zMDMtNy45NDctMC4yMzYgQzIxLjM2MSwxMi42MDcsMTguNTIsMTIuMzk4LDE3LjE3MiwxMi41NzF6IE0zMS4xNTYsNC40MDRjLTEuOTQ5LTEuOTQyLTQuNzI2LTIuODg2LTcuNDkzLTIuODggYy0xLjAxMiwwLjAwMi0yLjAyNiwwLjE1MS0yLjk4NCwwLjQ3M2MtMi4wNjIsMC42OTMtMy43NzcsMS45OTYtNC45NDYsMy44MTNzLTEuOTMxLDQuNzkyLTIuMTM0LDYuOTM2IGMtMi45MTktMC4yMDgtNS44MzItMC4wMjMtOC4zNTgsMC4yM2MtMC40MjgsMC4wNDMtMC45MSwwLjEyOS0xLjE0MiwwLjQ4N2MtMC4xMjksMC4xOTktMC4xNTIsMC40NDUtMC4xNzEsMC42OCBjLTAuMzEzLDMuOTY1LTAuMjEsNy45NjIsMC4zMDksMTEuOTA2YzAuMTQ5LDEuMTM2LDAuMzMzLDIuMjY3LDAuNDUyLDMuNDA2YzAuNTI0LDUuMDAxLTAuNTQ3LDguMjkxLDAuNTg0LDEzLjM2NCBjMC4xMTQsMC41MTMsMC43ODcsMy43MjYsNC41NzIsMy43MjZjNS43MzgsMCwxMC4wMzYsMC40MTUsMTUuNzM3LTAuMjI0YzMuMzI4LTAuMzczLDguMjE0LDAuMTI0LDExLjU1NCwwLjM3NSBjMC45NywwLjA3MywxLjk5MywwLjAzOSwyLjg0NC0wLjQyOWMwLjk4LTAuNTM5LDEuNTg1LTEuNTg4LDEuODQ0LTIuNjY3YzAuMjU5LTEuMDc5LDAuMjE3LTIuMjAzLDAuMTkxLTMuMzExIGMtMC4xODUtNy44MjUsMC40NzQtMTUuNjcsMS45NjMtMjMuMzU3YzAuMjA2LTEuMDY0LDAuMzA5LTIuNDE1LTAuNjI4LTIuOTc2Yy0wLjMyMy0wLjE5NC0wLjcxMi0wLjI0Mi0xLjA4Ny0wLjI4NyBjLTIuNTg5LTAuMzA4LTUuNDIyLTAuNjk1LTguMDEtMS4wMDNDMzQuMjc4LDkuOTI5LDMzLjEwNSw2LjM0NywzMS4xNTYsNC40MDR6Ij48L3BhdGg+PHBhdGggZD0iTTI2LjUwMSw0LjcxOWMtMy4xNjctMS43MzYtNi41MTUsMC4yNTEtOC4zMDcsMi45ODJjLTAuOTM4LDEuNDI5LTEuNTczLDMuMTQ1LTEuNTIyLDQuODcgYzAuMDAyLDAuMDc2LDAuMDIsMC4xNDIsMC4wNDcsMC4yYzAuMDUsMC4xODYsMC4xOTgsMC4zMywwLjQ1MywwLjNjMS45NTQtMC4yMjksMy45NSwwLjA0Myw1LjkxMi0wLjAwMSBjMi41NDUtMC4wNTcsNS4wNTItMC4wNzQsNy41ODMsMC4yNDRjMC4zNTEsMC4wNDQsMC41MzMtMC4zNTMsMC40ODItMC42MzNDMzAuNTg3LDkuNjExLDI5LjM5NCw2LjMwNCwyNi41MDEsNC43MTl6IE0yMy4wODQsMTIuMDcgYy0xLjc5MSwwLjA0LTMuNjA4LTAuMTY1LTUuMzk4LTAuMDMxYzAuMi0zLjE4NywyLjk0NC03LjA1NCw2LjMyOS03LjAxN2MxLjg0MiwwLjAyLDMuNTYxLDEuNDMsNC40NjQsMi45NTIgYzAuNzcyLDEuMzAxLDEuMjQxLDIuNzk0LDEuNTU5LDQuMjhDMjcuNzIxLDEyLjAxMiwyNS40MTgsMTIuMDE4LDIzLjA4NCwxMi4wN3oiPjwvcGF0aD48cGF0aCBkPSJNNDMuNjAyLDEzLjUyNGMtMC43ODgtMC40NjYtMS45MjItMC40MjQtMi44MDQtMC41MzRjLTEuMDc5LTAuMTM1LTIuMTU4LTAuMjc0LTMuMjM3LTAuNDEyIGMtMC45NDUtMC4xMjEtMS44OTEtMC4yMzktMi44MzctMC4zNTRjLTAuMDcyLTIuMDc0LTAuNjM5LTQuMTYxLTEuNjItNS45ODFjLTEuMDk2LTIuMDMzLTIuODM2LTMuNTIxLTQuOTc0LTQuMzgyIGMtNC41NzQtMS44NDMtMTAuMTAyLTAuNTYtMTIuODI4LDMuNjk3Yy0xLjI0OCwxLjk0OS0xLjg2Miw0LjM3LTIuMTQxLDYuNjY5Yy0yLjEzNS0wLjExOC00LjI3NC0wLjA1OS02LjQwNSwwLjExMiBjLTAuNzk0LDAuMDY0LTEuODM2LDAuMDAzLTIuNTU5LDAuMzkyYy0wLjgzNiwwLjQ1LTAuNzc3LDEuNDM3LTAuODMsMi4yNjJjLTAuMTUsMi4zNDktMC4xNTQsNC43MDctMC4wMTMsNy4wNTcgYzAuMTQsMi4zMjQsMC41MDUsNC42MDksMC43NzksNi45MThjMC40OCw0LjAzOC0wLjIzMiw4LjEwMiwwLjMyNSwxMi4xMzFjMC4yOTgsMi4xNTksMC44NDQsNC40NSwzLjAyMyw1LjQ1NyBjMS42NTcsMC43NjYsMy42NTcsMC40ODgsNS40MjksMC41MjNjMi4xMDcsMC4wNDEsNC4yMTQsMC4xMTEsNi4zMjEsMC4wOTdjMi4xNTMtMC4wMTQsNC4yOTQtMC4xNDEsNi40MzUtMC4zNjQgYzEuODg3LTAuMTk2LDMuNzk3LTAuMTM4LDUuNjg3LTAuMDM4YzEuODczLDAuMDk5LDMuNzQsMC4yNjksNS42MSwwLjQwOWMxLjg4OSwwLjE0MSwzLjY5OS0wLjIxOSw0LjczOC0xLjk1MiBjMS4xMDMtMS44NCwwLjgxNi00LjEyLDAuNzkxLTYuMTY1Yy0wLjAyOS0yLjMyNCwwLjAxNy00LjY0OCwwLjEzNi02Ljk2OWMwLjI0My00LjcyLDAuNzkzLTkuNDIzLDEuNjQ5LTE0LjA3MSBDNDQuNTM2LDE2LjYyNSw0NS4xNDgsMTQuNDM4LDQzLjYwMiwxMy41MjR6IE00My41MjUsMTYuNjM3Yy0wLjcyNCw0LjIwNy0xLjM4Nyw4LjM5My0xLjcxNiwxMi42NTMgYy0wLjE2MywyLjExNC0wLjI2NSw0LjIzMi0wLjMwNiw2LjM1MmMtMC4wNDEsMi4xNDEsMC4xMTIsNC4yOTYsMC4wMTcsNi40MzNjLTAuMDg3LDEuOTY2LTAuOTI2LDMuOTQ2LTMuMTI3LDQuMTMxIGMtMS42OTEsMC4xNDItMy40ODItMC4xOTMtNS4xNy0wLjMxM2MtMS44MTEtMC4xMjktMy42MjgtMC4yMzEtNS40NDUtMC4yYy0xLjg2OCwwLjAzMi0zLjcyLDAuMzA5LTUuNTg2LDAuNDA0IGMtMy45MTIsMC4xOTgtNy44MjctMC4wMjktMTEuNzQxLTAuMDQ5Yy0xLjQtMC4wMDctMi43My0wLjE2LTMuNzA3LTEuMjY4Yy0wLjQ3OC0wLjU0MS0wLjc3Ny0xLjIxNi0wLjk1LTEuOTExIGMtMC44NDMtMy4zOTUtMC40NTEtNi44NDMtMC40NTQtMTAuMjkzQzUuMzQsMzAuNTM2LDUuMDgsMjguNTQsNC44LDI2LjUyNGMtMC4zMDEtMi4xNjktMC40ODItNC4zNTMtMC41MzQtNi41NDIgYy0wLjAyNS0xLjA1NS0wLjAyMS0yLjExLDAuMDEzLTMuMTY1YzAuMDE3LTAuNTI3LDAuMDQxLTEuMDU0LDAuMDcyLTEuNTgxYzAuMDI1LTAuNDIzLTAuMDY5LTEuMzMxLDAuMjg4LTEuNTk3IGMwLjI4Ni0wLjIxMywwLjc5Ni0wLjE4MywxLjEzMy0wLjIxNWMwLjUxNC0wLjA0OCwxLjAyNy0wLjA5MSwxLjU0Mi0wLjEyOGMxLjA0Ni0wLjA3NSwyLjA5NC0wLjEyNSwzLjE0Mi0wLjEzNyBjMS4wNDgtMC4wMTIsMi4wOTYsMC4wMTYsMy4xNDIsMC4wODdjMC4yODksMC4wMTksMC40NzQtMC4yNDYsMC41LTAuNWMwLjIwMy0yLjAxOCwwLjcxMi00LjExOSwxLjYzNy01LjkzMiBjMC45MzYtMS44MzQsMi41MTEtMy4yNzQsNC40MDQtNC4wOGM0LjAxOC0xLjcxMSw5LjQzMy0wLjMzMywxMS43NzYsMy40NWMxLjE4MywxLjkxMSwxLjgzOSw0LjIzNCwxLjgzNyw2LjQ4MSBjMCwwLjI3NiwwLjE4NSwwLjQyNiwwLjM5NSwwLjQ2NmMwLjAzNSwwLjAxMiwwLjA2NSwwLjAzLDAuMTA1LDAuMDM0YzIuMDMxLDAuMjQyLDQuMDU5LDAuNTEyLDYuMDg4LDAuNzY3IGMwLjQ5MiwwLjA2MiwwLjk4NCwwLjEyMywxLjQ3NiwwLjE4M2MwLjQ0LDAuMDUzLDAuOTg3LDAuMDUsMS4zNTUsMC4zMjlDNDMuNzk0LDE0LjkxNCw0My42MzksMTUuOTc1LDQzLjUyNSwxNi42Mzd6Ij48L3BhdGg+PHBhdGggZmlsbD0iI2Q2ZTVlNSIgZD0iTTE3LjM2NCwzNi4zOTdjLTAuNDc3LDAuNTQtMC44MDMsMS4zNjItMS4xMzQsMi4wMDNjMS42MzYsMS41MzIsMy43NDMsMi41NzEsNS45NiwyLjkwNSBzNC42NCwwLjE1NSw2LjY1NS0wLjgyNmMwLjg2OC0wLjQyMywxLjcyMy0xLjAwNywyLjExNC0xLjg4OWMwLjIxOS0wLjQ5MywwLjM5Ni0xLjQyNywwLjQ1LTEuOTY0IGMwLjE4NS0xLjg2NywwLjE5My0zLjU1My0wLjk1NS01LjAzN2MtMC44MTYtMS4wNTUtMi4xMi0xLjU4Ny0zLjM2Mi0yLjA3NGMtMS4yOTQtMC41MDctMi41ODgtMS4wMTUtMy44ODEtMS41MjIgYy0wLjg3Mi0wLjM0Mi0xLjc4LTAuNzA5LTIuMzk1LTEuNDE3Yy0wLjc0LTAuODUzLTAuOTE5LTIuMTMtMC41MDktMy4xODJjMC40MS0xLjA1MiwxLjM2Ni0xLjg1NSwyLjQ1NS0yLjE1MSBjMS4wOTEtMC4yOTcsMi4yNTktMC4xMTIsMy4zMzYsMC4yMzFzMi4xLDAuODM5LDMuMTc3LDEuMTg0YzAuMDkxLDAuMDI5LDAuMTg4LDAuMDU3LDAuMjc5LDAuMDMxIGMwLjExNC0wLjAzMywwLjE4OC0wLjE0LDAuMjUzLTAuMjRjMC4zMDItMC40NzEsMC41NTEtMS4xNzMsMC44NTMtMS42NDRjLTEuMjM0LTAuOTM1LTIuNjY3LTEuOTA4LTQuMTI3LTIuNDIxIGMtMC42MjMtMC4yMTktMS4yNjYtMC40MzMtMS45MjYtMC40MzNjLTMuMjE0LDAtNC4zNzIsMC44MjgtNS41MTIsMS42MjNzLTIuMDUxLDEuOTc4LTIuMzE2LDMuMzQyIGMtMC4xMTUsMC41OS0wLjEwOCwxLjE5OS0wLjAyMywxLjc5NGMwLjM0NCwyLjQxMywyLjA1NCw0LjU4Myw0LjMyLDUuNDgxYzEuMzkyLDAuNTUyLDIuOTU3LDAuNjUzLDQuMjYyLDEuMzg4IGMwLjQxNCwwLjIzMywwLjc5MiwwLjUyNSwxLjE2MywwLjgyM2MwLjQ1NSwwLjM2NSwwLjkwNywwLjc0NywxLjIzOSwxLjIyNmMwLjM5OCwwLjU3NSwwLjYwNiwxLjI4LDAuNTg0LDEuOTc5IGMtMC4wMDgsMC4yNDEtMC4wNDIsMC40ODItMC4xMjcsMC43MDdjLTAuMDkyLDAuMjQzLTAuMjQsMC40NjItMC40MDgsMC42NmMtMC45MiwxLjA4My0yLjQxNiwxLjUzOC0zLjgzNywxLjUxNSBjLTEuNDIxLTAuMDI0LTIuNzk4LTAuNDY3LTQuMTQ3LTAuOTE0QzE5LjA3OSwzNy4zMzMsMTguMTA0LDM2LjkzOSwxNy4zNjQsMzYuMzk3eiI+PC9wYXRoPjxwYXRoIGQ9Ik0zMS4zMjMsMzIuMDA4Yy0wLjc3OS0xLjQ1NC0yLjE4LTIuMjAzLTMuNjUzLTIuOGMtMS43ODUtMC43MjMtMy43MDQtMS4yODItNS40MTItMi4xNzMgYy0wLjgzOC0wLjQzNy0xLjQ3OC0xLjA4Mi0xLjYzMS0yLjA0NGMtMC4xMzItMC44MzEsMC4xMjktMS42NjgsMC42ODgtMi4yOTNjMS41MTMtMS42OTEsMy44NzQtMS4wNzYsNS43MTMtMC4zNjEgYzAuNTI3LDAuMjA1LDEuMDQ4LDAuNDI0LDEuNTc5LDAuNjE3YzAuMzUyLDAuMTI4LDAuNzYyLDAuMzI5LDEuMTM5LDAuMTljMC43Mi0wLjI2NiwwLjk4NC0xLjQ5MSwxLjM0NS0yLjA4OSBjMC4xNTEtMC4yNTEsMC4wMzQtMC41MjMtMC4xNzktMC42ODRjLTEuNDM2LTEuMDgyLTIuOTQyLTIuMDYxLTQuNjY1LTIuNjE1Yy0xLjQ3My0wLjQ3My0zLjE0MS0wLjM2Ny00LjYzLDAuMDE0IGMtMi4yNiwwLjU3OC00LjU4LDIuMzQ2LTUuMjMzLDQuNjQyYy0wLjgyLDIuODgyLDAuODksNi4wNzcsMy4zMDUsNy42MjRjMS40NTcsMC45MzQsMy4xNjcsMS4wNDUsNC43NDQsMS42NjMgYzEuNTI1LDAuNTk3LDMuNDgzLDIuMSwzLjM4OSwzLjkwNGMtMC4xMDIsMS45NjItMi44MDcsMi40ODItNC4zNDQsMi4zNTljLTEuMTM2LTAuMDkxLTIuMjQtMC40NDMtMy4zMTctMC43OTggYy0wLjktMC4yOTctMS43NjUtMC42NTMtMi41NDQtMS4yYy0wLjAyNi0wLjAxOC0wLjA1MS0wLjAyMS0wLjA3Ni0wLjAzM2MtMC4wMTYtMC4wMDgtMC4wMzEtMC4wMTQtMC4wNDctMC4wMjEgYy0wLjAzOC0wLjAxMy0wLjA3NC0wLjAyNi0wLjExLTAuMDI4Yy0wLjAzNC0wLjAwNC0wLjA2NywwLjAwMS0wLjEwMiwwLjAwNmMtMC4wMTksMC4wMDQtMC4wMzgsMC4wMDUtMC4wNTUsMC4wMTEgYy0wLjA0MywwLjAxMy0wLjA4MywwLjAzOS0wLjEyNCwwLjA2OWMtMC4wMDgsMC4wMDYtMC4wMTYsMC4wMTItMC4wMjQsMC4wMTljLTAuMDIyLDAuMDE5LTAuMDQ3LDAuMDI5LTAuMDY4LDAuMDU0IGMtMC41MjUsMC42MzUtMC44NDMsMS4zNzUtMS4yMTIsMi4xMDRjLTAuMDk3LDAuMTkzLTAuMDkxLDAuNDUxLDAuMDc4LDAuNjA2YzIuNTUzLDIuMzQ2LDUuOTQ3LDMuNDUsOS4zOTYsMy4xNjIgYzEuNjUtMC4xMzgsMy4zNzktMC41NzgsNC43NTEtMS41NDNjMS4zMDctMC45MiwxLjcxOS0yLjIxNiwxLjg4NS0zLjc0N0MzMi4wNzcsMzUuMDY5LDMyLjA4MSwzMy40MjMsMzEuMzIzLDMyLjAwOHogTTMwLjc2NCwzNy40OWMtMC4xNTUsMC43MTMtMC4zOTcsMS4zMDYtMC45NjQsMS43OTljLTAuNjksMC42LTEuNTk2LDAuOTgtMi40NjMsMS4yMzhjLTMuNjEsMS4wNzYtNy42NDcsMC4xNzgtMTAuNDg2LTIuMjY3IGMwLjE5NS0wLjQxMiwwLjM5Ni0wLjgyNSwwLjY0OC0xLjIwM2MxLjMzMywwLjgyOCwyLjk0MywxLjMyOCw0LjQ0NywxLjY2N2MxLjUzNSwwLjM0NiwzLjE1NSwwLjQwMiw0LjYxOS0wLjI1MiBjMS4zNC0wLjU5OSwyLjM3NS0xLjc1NSwyLjI0Mi0zLjI4N2MtMC4xNTEtMS43MzQtMS41MDEtMi45MjUtMi44NzItMy44MjdjLTEuNDM3LTAuOTQ1LTMuMTctMS4wMTQtNC43MjgtMS42NTEgYy0xLjQwNy0wLjU3NS0yLjU2Ny0xLjY3Ni0zLjI4LTMuMDExYy0wLjgwMy0xLjUwNC0xLjA1NS0zLjQwNC0wLjE5Mi00LjkzNmMwLjYwOC0xLjA4LDEuNjI2LTEuODY2LDIuNjk3LTIuNDU3IGMxLjI4Ni0wLjcwOSwyLjk0LTAuOTYxLDQuMzkzLTAuODQ2YzEuODg5LDAuMTUsMy42NzksMS4zNjIsNS4xOSwyLjQ4NmMtMC4xMDIsMC4yLTAuMTk5LDAuNDAyLTAuMjk3LDAuNjA1IGMtMC4wNywwLjE0NS0wLjE0MywwLjM4Mi0wLjI1NSwwLjQ5OWMtMC4xNjQsMC4xNzIsMC4wNTcsMC4xOTktMC4yNzEsMC4wNTZjLTAuODU0LTAuMzcxLTEuNzYtMC43MDEtMi42NDEtMS4wMDUgYy0xLjU0NC0wLjUzNC0zLjI4My0wLjc3OC00Ljc4OCwwLjAwNmMtMS4yNjQsMC42NTgtMi4xNDYsMS45NTUtMi4xNzIsMy4zOTNjLTAuMDI4LDEuNTUzLDAuOTAyLDIuNzcyLDIuMjUsMy40NDkgYzEuNjMxLDAuODE4LDMuNDIsMS4zODIsNS4xMTYsMi4wNTFjMS41MjMsMC42LDMuMDQyLDEuMjk5LDMuNjksMi45MTlDMzEuMjA2LDM0LjMwOCwzMS4wNzcsMzYuMDUyLDMwLjc2NCwzNy40OXoiPjwvcGF0aD4KPC9zdmc+"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => item[user.role] ? <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium',
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </Link>: null
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {user.role!=="admin" && <>
                      <Link to='/cart'>
                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5"/>
                        <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      </Link>
                      {items.length>0&&<span className="inline-flex items-center rounded-full z-0 mb-7 -ml-3 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                        {items.length}
                      </span>}</>}

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                          </MenuButton>
                        </div>
                        <MenuItems
                          transition
                          className="absolute right-0 z-10 mt-2 w-48 origin-top-right border border-1 rounded-none bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                          {userNavigation.map((item) =>item[user.role]? <MenuItem key={item.name}>
                              {({ focus }) => <Link
                                  to={item.href}
                                  className={classNames(
                                    focus ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700',
                                  )}
                                >
                                  {item.name}
                                </Link>}
                            </MenuItem>:null
                          )}
                        </MenuItems>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </DisclosureButton>
                  </div>
                </div>
              </div>

              <DisclosurePanel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => item[user.role]?<Link
                      key={item.name}
                      as="a"
                      to={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium',
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>: null
                  )}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>
                   {user.role!=="admin" && <><Link to='/cart'>
                    <button
                      type="button"
                      className="ms-5 relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    </Link>
                    {items.length>0&&<span className="inline-flex items-center rounded-full z-0 mb-7 -ml-3 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                        {items.length}
                    </span>}</>}
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => item[user.role]?
                      <Link
                        key={item.name}
                        as="a"
                        to={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Link>: null
                    )}
                  </div>
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>

        <header className="bg-gray-100 shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">E-Commnerce</h1>
          </div>
        </header>
        <main className='bg-white'>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>}
    </>
  )
}
