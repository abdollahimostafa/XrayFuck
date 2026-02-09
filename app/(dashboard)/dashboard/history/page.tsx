"use client"

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import {
  CheckCircle,
  Clock,
  X,
  XCircle,
  ImageIcon,
  Cpu,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react"
import { Headpan } from "@/components/headpan"

interface MedicalImageTask {
  id: string
  patientName: string
  imageType: string
  aiModel: string
  date: string
  status: "processing" | "done" | "error"
}

// Fake API
async function getMedicalImageTasks(): Promise<MedicalImageTask[]> {
  return [
    {
      id: "1",
      patientName: "علی رضایی",
      imageType: "MRI",
      aiModel: "Brain Tumor Model",
      date: "2025-10-18",
      status: "processing",
    },
    {
      id: "2",
      patientName: "محمد حسینی",
      imageType: "CT Scan",
      aiModel: "Spine Fracture Model",
      date: "2025-10-19",
      status: "done",
    },
    {
      id: "3",
      patientName: "سارا محمدی",
      imageType: "X-Ray",
      aiModel: "Bone Density Model",
      date: "2025-10-20",
      status: "error",
    },
  ]
}

export default function MedicalImageDashboard() {
  const [search, setSearch] = useState("")
  const [data, setData] = useState<MedicalImageTask[]>([])
  const [statusFilter, setStatusFilter] = useState<string>("")
  const [modelFilter, setModelFilter] = useState<string>("")
  const [selectedTask, setSelectedTask] = useState<MedicalImageTask | null>(null)
  const [drawerType, setDrawerType] = useState<"view" | null>(null)

  useEffect(() => {
    getMedicalImageTasks().then(setData)
  }, [])

  const clearAllFilters = () => {
    setSearch("")
    setStatusFilter("")
    setModelFilter("")
  }

  const getStatusBadge = (status: MedicalImageTask["status"]) => {
    switch (status) {
      case "processing":
        return <Badge className="bg-yellow-500 text-white">در حال پردازش</Badge>
      case "done":
        return <Badge className="bg-green-500 text-white">انجام شده</Badge>
      case "error":
        return <Badge className="bg-red-500 text-white">خطا</Badge>
    }
  }

  const filteredData = data.filter((t) => {
    const normalizedSearch = search
    const matchesSearch =
      t.patientName.includes(normalizedSearch) ||
      t.imageType.includes(normalizedSearch) ||
      t.aiModel.includes(normalizedSearch)

    const matchesStatus = statusFilter ? t.status === statusFilter : true
    const matchesModel = modelFilter ? t.aiModel === modelFilter : true

    return matchesSearch && matchesStatus && matchesModel
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Headpan />

      <div className="flex justify-center p-4">
        <div className="rounded-xl max-w-7xl w-full p-4 sm:p-8 space-y-6">

          {/* Header */}
          <div className="flex items-center gap-4 bg-primary/10 p-4 rounded-xl">
            <ImageIcon className="w-16 h-16 text-primary p-2 bg-primary/20 rounded-full" />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">همه پردازش‌های تصاویر پزشکی</h1>
              <p className="text-gray-600 mt-1 text-sm md:text-md">لیست تمامی پردازش‌های AI تصاویر پزشکی</p>
            </div>
          </div>

          {/* Filter Toolbar */}
          <div className="p-4 bg-gray-50 rounded-lg border space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="جستجو بر اساس نام بیمار، نوع تصویر یا مدل AI..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 h-10"
              />
              <Button
                variant="outline"
                onClick={clearAllFilters}
                className="h-10 flex items-center gap-2"
              >
                <X size={16} /> پاک کردن فیلترها
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Select onValueChange={setStatusFilter} value={statusFilter}>
                <SelectTrigger className="h-10 w-full text-right" dir="rtl">
                  <SelectValue placeholder="وضعیت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="processing">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-500" /> در حال پردازش
                    </span>
                  </SelectItem>
                  <SelectItem value="done">
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" /> انجام شده
                    </span>
                  </SelectItem>
                  <SelectItem value="error">
                    <span className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-600" /> خطا
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={setModelFilter} value={modelFilter}>
                <SelectTrigger className="h-10 w-full text-right" dir="rtl">
                  <SelectValue placeholder="مدل AI" />
                </SelectTrigger>
                <SelectContent>
                  {[...new Set(data.map(d => d.aiModel))].map(model => (
                    <SelectItem key={model} value={model}>{model}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Card List */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredData.length ? (
              filteredData.map((t) => (
                <div key={t.id} className="p-4 bg-gray-50 rounded-lg border hover:shadow-md transition">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="font-bold text-lg text-gray-800">{t.patientName}</h2>
                    {getStatusBadge(t.status)}
                  </div>
                  <p className="text-gray-700 text-sm flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-gray-500" /> {t.aiModel}
                  </p>
                  <p className="text-gray-700 text-sm flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-gray-500" /> {t.imageType}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">{t.date}</p>

                  <div className="flex gap-2 mt-3">
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 text-xs"
                          onClick={() => {
                            setSelectedTask(t)
                            setDrawerType("view")
                          }}
                        >
                          مشاهده
                        </Button>
                      </DrawerTrigger>
                      {drawerType === "view" && selectedTask?.id === t.id && (
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>{t.patientName}</DrawerTitle>
                            <DrawerDescription>اطلاعات کامل پردازش تصویر</DrawerDescription>
                          </DrawerHeader>
                          <div className="p-4 space-y-2 text-sm text-gray-700">
                            <p>نام بیمار: {t.patientName}</p>
                            <p>نوع تصویر: {t.imageType}</p>
                            <p>مدل AI: {t.aiModel}</p>
                            <p>تاریخ: {t.date}</p>
                            <p>وضعیت: {t.status}</p>
                          </div>
                          <DrawerFooter>
                            <DrawerClose asChild>
                              <Button variant="outline">بستن</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      )}
                    </Drawer>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">نتیجه‌ای یافت نشد.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
