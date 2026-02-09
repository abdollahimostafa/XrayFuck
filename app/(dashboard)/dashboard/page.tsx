"use client"

import { useState } from "react"
import { X } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Headpan } from "@/components/headpan"

interface UploadedFile {
  file: File
  aiModel?: string
}

export default function Page() {
  const [title, setTitle] = useState("")
  const [files, setFiles] = useState<UploadedFile[]>([])

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = e.target.files
    if (!selectedFiles) return
    const newFiles: UploadedFile[] = Array.from(selectedFiles).map((file) => ({ file }))
    setFiles((prev) => [...prev, ...newFiles])
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    if (files.length > 0) return
    const droppedFiles = e.dataTransfer.files
    if (!droppedFiles) return
    const newFiles: UploadedFile[] = Array.from(droppedFiles).map((file) => ({ file }))
    setFiles((prev) => [...prev, ...newFiles])
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
  }

  function handleRemove(idx: number) {
    setFiles((prev) => prev.filter((_, i) => i !== idx))
  }

  function handleSelectModel(idx: number, model: string) {
    setFiles((prev) =>
      prev.map((f, i) => (i === idx ? { ...f, aiModel: model } : f))
    )
  }

  function formatSize(size: number) {
    return `${(size / 1024).toFixed(2)} KB`
  }

  const uploadDisabled = files.length > 0
  const aiModels = ["Model A", "Model B", "Model C"]

  return (
    <div>
      {/* Header */}

<Headpan/>
      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Headline & Caption */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold">آپلود تصاویر</h1>
          <p className="text-muted-foreground mt-1">
            می‌توانید تصاویر خود را با کشیدن و رها کردن یا انتخاب فایل‌ها آپلود کنید.
          </p>
        </div>

        {/* Title input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1" htmlFor="process-title">
            عنوان فرآیند
          </label>
          <input
            id="process-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="عنوان فرآیند خود را وارد کنید"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Upload box */}
        <div className="relative">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={`border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-gray-400 transition ${
              uploadDisabled ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <p className="text-gray-500 mb-2">تصاویر خود را اینجا رها کنید</p>
            <p className="text-gray-400 mb-4">یا از دکمه زیر انتخاب کنید</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFiles}
              className="hidden"
              id="file-upload"
              disabled={uploadDisabled}
            />
            <label
              htmlFor="file-upload"
              className={`inline-block px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition ${
                uploadDisabled ? "pointer-events-none opacity-50" : ""
              }`}
            >
              انتخاب فایل
            </label>
          </div>
          {uploadDisabled && (
            <div className="absolute inset-0 backdrop-blur-xl bg-white/60 rounded-xl flex items-center justify-center pointer-events-none">
              <p className="text-blue-600 font-bold text-2xl">تصویر آپلود شد</p>
            </div>
          )}
        </div>

        {/* Accepted image details */}
  {files.length > 0 && (
  <div className="mt-6 space-y-4">
    <h2 className="font-semibold text-lg">جزئیات تصاویر آپلود شده</h2>
    {files.map((item, idx) => (
      <div
        key={idx}
        className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white rounded-xl p-4 shadow hover:shadow-md transition border border-gray-200"
      >
        {/* File Info */}
        <div className="flex-1">
          <p className="font-medium text-gray-800">{item.file.name}</p>
          <p className="text-gray-500 text-sm mt-1">
            {item.file.type || "نامشخص"} - {formatSize(item.file.size)}
          </p>
          {/* AI Model dropdown */}
          <div className="mt-3 sm:mt-1">
            <Select
              value={item.aiModel}
              onValueChange={(value) => handleSelectModel(idx, value)}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="انتخاب مدل AI" />
              </SelectTrigger>
              <SelectContent>
                {aiModels.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => handleRemove(idx)}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition sm:static sm:ml-4"
        >
          <X size={20} />
        </button>
      </div>
    ))}
  </div>
  
)}
{/* Send Button */}
{files.length > 0 && files.every((f) => !!f.aiModel) && (
  <div className="mt-6 flex justify-end">
    <button 
      onClick={() => {
        console.log("Title:", title)
        console.log("Files:", files)
        alert("فرآیند ارسال شد!")
      }}
      disabled={!title}
      className={`px-6 py-2 rounded-lg text-white font-medium transition ${
        !title
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      ارسال
    </button>
  </div>
)}



      </div>
    </div>
  )
}
