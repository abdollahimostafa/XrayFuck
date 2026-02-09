"use client"
import { useSession } from 'next-auth/react'


import * as React from "react"
import {

  Command,
  Home,
  Instagram,
  LifeBuoy,
  MenuSquare,

  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "مصطفی",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "آنالیز ها",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "بررسی جدید",
          url: "/dashboard",
        },
        // {
        //   title: "آزمون های من",
        //   url: "#",
        // },
        {
          title: "سوابق",
          url: "/dashboard/history",
        },
      ],
    },
    // {
    //   title: "نتایج",
    //   url: "#",
    //   icon: Bot,
    //   items: [
    //     {
    //       title: "نتایج آزمون ها",
    //       url: "/dashboard/mydescrip",
    //     },
    //     {
    //       title: "نمودار پیشرفت",
    //       url: "/dashboard/myanalyze",
    //     },

    //   ],
    // },
    // {
    //   title: "پاسخ نامه",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "سوالات آزمون",
    //       url: "/dashboard/myresults",
    //     },
    //     {
    //       title: "پاسخنامه ها",
    //       url: "/dashboard/myresults",
    //     },
    //     // {
    //     //   title: "تحلیل ها",
    //     //   url: "#",
    //     // },

    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  navSecondary: [
    {
      title: "پشتیبانی",
      url: "https://t.me/MAD_ADMIN_1",
      icon: LifeBuoy,
    },

  ],
  projects: [

    {
            name: "اینستاگرام",
      url: "https://instagram.com/Mad_residency",
      icon: Instagram,

    },

  ],

   proz: [
{
            name: "صفحه اصلی ",
      url: "/",
      icon: Home,

    },
    {
            name: "داشبورد",
      url: "/dashboard",
      icon: MenuSquare,

    },
    

  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession()

  const dataer = {
    user: {
      name: session?.user?.name || "...",
      email: session?.user?.phoneNumber || "بدون شماره",
      avatar: "/avatars/default.jpg",
    },
  }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-blue-600 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4 " />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">آنالیز تصاویر پزشکی</span>
                  <span className="truncate text-xs">ناحیه کاربری</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavProjects projects={data.proz} />
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        {status === "loading" ? (
          <div className="flex items-center justify-center w-full py-4">
            <svg
              className="w-6 h-6 animate-spin text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          </div>
        ) : (
          <NavUser user={dataer.user} />
        )}
      </SidebarFooter>
    </Sidebar>
  )
}